const { Prisma } = require('@prisma/client');
const { ZodError } = require('zod');

const errorHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Data yang dikirim tidak valid.',
      errors: error.issues,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Data tidak ditemukan.' });
    }
  }

  console.error(error);

  return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
};

module.exports = { errorHandler };
