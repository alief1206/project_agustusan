const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const { env } = require('../config/env');
const { prisma } = require('../config/prisma');

const loginSchema = z.object({
  email: z.string().trim().min(3),
  password: z.string().min(6),
});

const login = async (req, res) => {
  const data = loginSchema.parse(req.body);
  const admin = await prisma.adminUser.findUnique({ where: { email: data.email } });

  if (!admin) {
    return res.status(401).json({ message: 'Username atau password salah.' });
  }

  const isValid = await bcrypt.compare(data.password, admin.passwordHash);

  if (!isValid) {
    return res.status(401).json({ message: 'Username atau password salah.' });
  }

  const token = jwt.sign(
    { sub: admin.id, email: admin.email, role: admin.role },
    env.JWT_SECRET,
    { expiresIn: '1d' },
  );

  return res.json({
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  });
};

const me = async (req, res) => {
  return res.json({ admin: req.admin });
};

module.exports = { login, me };
