const { Prisma } = require('@prisma/client');
const { z } = require('zod');

const { prisma } = require('../config/prisma');

const normalizeText = (value) => value.trim().replace(/\s+/g, ' ').toLowerCase();

const voteSchema = z.object({
  candidateId: z.string().min(1),
  voterName: z.string().trim().min(2, 'Nama harus diisi minimal 2 karakter'),
  voterAddress: z.string().trim().min(5, 'Alamat terlalu pendek')
    .regex(/rt\s*\.?\s*\d+/i, 'Alamat harus mengandung nomor RT (contoh: RT 01)')
    .regex(/rw\s*\.?\s*\d+/i, 'Alamat harus mengandung nomor RW (contoh: RW 02)')
    .regex(/no\s*\.?\s*\d+|\d+/i, 'Alamat harus mengandung nomor rumah'),
});

const createVote = async (req, res) => {
  try {
    const data = voteSchema.parse(req.body);
    const candidate = await prisma.candidate.findFirst({
      where: { id: data.candidateId, status: 'ACTIVE' },
      include: { category: true },
    });

    if (!candidate) {
      return res.status(404).json({ message: 'Kandidat aktif tidak ditemukan.' });
    }

    const voterNameKey = normalizeText(data.voterName);
    const voterAddressKey = normalizeText(data.voterAddress);

    // 1. Cek apakah orang ini sudah memilih di kategori yang sama
    const existingVote = await prisma.vote.findFirst({
      where: {
        voterNameKey,
        voterAddressKey,
        categoryId: candidate.categoryId,
      },
      select: { id: true },
    });

    if (existingVote) {
      return res.status(409).json({
        message: 'Nama dan alamat ini sudah pernah memilih pada kategori ini. Setiap warga hanya bisa memilih 1 kali per kategori.',
      });
    }

    // 2. Cek apakah alamat ini sudah digunakan oleh 6 orang yang berbeda
    const uniqueNamesAtAddress = await prisma.vote.findMany({
      where: { voterAddressKey },
      select: { voterNameKey: true },
      distinct: ['voterNameKey'],
    });

    // Kalau nama yang mau divote belum ada di daftar nama unik alamat tersebut, 
    // berarti ini adalah orang baru (ke- N+1). Jika N >= 6, tolak.
    if (uniqueNamesAtAddress.length >= 6) {
      const isExistingName = uniqueNamesAtAddress.some(v => v.voterNameKey === voterNameKey);
      if (!isExistingName) {
        return res.status(403).json({
          message: 'Alamat ini sudah digunakan oleh batas maksimal (6 nama yang berbeda).',
        });
      }
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
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({
        message: 'Nama dan alamat ini sudah pernah memilih pada kategori ini. Setiap warga hanya bisa memilih 1 kali per kategori.',
      });
    }

    console.error('Error creating vote:', error);
    return res.status(500).json({ message: 'Gagal memproses suara Anda.' });
  }
};

const listVotes = async (_req, res) => {
  const votes = await prisma.vote.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      candidate: {
        select: { id: true, name: true, role: true },
      },
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
  });

  return res.json({ data: votes });
};

const deleteVote = async (req, res) => {
  const { id } = req.params;
  const existing = await prisma.vote.findUnique({ where: { id } });

  if (!existing) {
    return res.status(404).json({ message: 'Data suara tidak ditemukan.' });
  }

  await prisma.vote.delete({ where: { id } });

  return res.json({ message: 'Data suara berhasil dihapus.' });
};

module.exports = {
  createVote,
  listVotes,
  deleteVote,
};
