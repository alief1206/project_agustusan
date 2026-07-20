const jwt = require('jsonwebtoken');

const { env } = require('../config/env');
const { prisma } = require('../config/prisma');

const authenticateAdmin = async (req, res, next) => {
  const header = req.get('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Token admin diperlukan.' });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    const admin = await prisma.adminUser.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!admin) {
      return res.status(401).json({ message: 'Admin tidak ditemukan.' });
    }

    req.admin = admin;
    return next();
  } catch (_error) {
    return res.status(401).json({ message: 'Token admin tidak valid.' });
  }
};

module.exports = { authenticateAdmin };
