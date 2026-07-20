const { Prisma } = require('@prisma/client');
const { z } = require('zod');

const { prisma } = require('../config/prisma');

const normalizeText = (value) => value.trim().replace(/\s+/g, ' ').toLowerCase();

const voteSchema = z.object({
  candidateId: z.string().min(1),
  voterName: z.string().trim().min(2),
  voterAddress: z.string().trim().min(5),
});

const createVote = async (req, res) => {
  const data = voteSchema.parse(req.body);
  const candidate = await prisma.candidate.findFirst({
    where: { id: data.candidateId, status: 'ACTIVE' },
    include: { category: true },
  });

  if (!candidate) {
    return res.status(404).json({ message: 'Kandidat aktif tidak ditemukan.' });
  }

  try {
    const voterNameKey = normalizeText(data.voterName);
    const voterAddressKey = normalizeText(data.voterAddress);
    const existingVote = await prisma.vote.findFirst({
      where: { voterNameKey, voterAddressKey },
      select: { id: true },
    });

    if (existingVote) {
      return res.status(409).json({
        message: 'Nama dan alamat ini sudah pernah mengisi polling. Data yang sama hanya bisa vote satu kali.',
      });
    }

    const vote = await prisma.vote.create({
      data: {
        candidateId: candidate.id,
        categoryId: candidate.categoryId,
        voterName: data.voterName,
        voterNameKey,
        voterAddress: data.voterAddress,
        voterAddressKey,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      },
      select: {
        id: true,
        candidateId: true,
        categoryId: true,
        createdAt: true,
      },
    });

    return res.status(201).json({ message: 'Suara berhasil dicatat.', data: vote });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({
        message: 'Nama dan alamat ini sudah pernah mengisi polling. Data yang sama hanya bisa vote satu kali.',
      });
    }

    throw error;
  }
};

module.exports = { createVote };
