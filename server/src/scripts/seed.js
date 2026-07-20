require('dotenv').config();

const bcrypt = require('bcryptjs');

const { prisma } = require('../config/prisma');

const categories = [
  {
    slug: 'rt',
    name: 'Kandidat RT Terfavorit',
    candidates: [
      { name: 'EKO RETNANI', role: 'Ketua RT. 01/01 Welaran', region: 'Welaran' },
      { name: 'NANANG ARIYANTO', role: 'Ketua RT. 02/01 Welaran', region: 'Welaran' },
      { name: 'RESTU WAHYU PRASTIYO', role: 'Ketua RT. 06/01 Welaran', region: 'Welaran' },
      { name: 'IMAM HARIYADI', role: 'Ketua RT. 02/02 Welaran', region: 'Welaran' },
    ],
  },
  {
    slug: 'rw',
    name: 'Kandidat RW Terfavorit',
    candidates: [
      { name: 'BUDI SANTOSO', role: 'Ketua RW. Welaran/01', region: 'Welaran' },
      { name: 'SUTRISNO', role: 'Ketua RW. Welaran/02', region: 'Welaran' },
    ],
  },
  {
    slug: 'posyandu',
    name: 'Kader Posyandu Terfavorit',
    candidates: [
      { name: 'SITI RAHMANIAH', role: 'POSYANDU: APEL KADER', region: 'Welaran' },
      { name: 'MUIDYANTI', role: 'POSYANDU: APEL KADER', region: 'Welaran' },
      { name: 'MASITAH', role: 'POSYANDU: APEL KADER', region: 'Welaran' },
      { name: 'SULIS EKAWASIH', role: 'POSYANDU: APEL KADER', region: 'Welaran' },
      { name: 'SINTA KAROHMAH', role: 'POSYANDU: APEL KADER', region: 'Welaran' },
      { name: 'DIANA DWI SETYOWATI', role: 'POSYANDU: JERUK KADER', region: 'Welaran' },
    ],
  },
];

const seed = async () => {
  for (const category of categories) {
    const savedCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
      },
      create: {
        slug: category.slug,
        name: category.name,
      },
    });

    for (const candidate of category.candidates) {
      const existingCandidate = await prisma.candidate.findFirst({
        where: {
          categoryId: savedCategory.id,
          name: candidate.name,
        },
      });

      if (existingCandidate) {
        await prisma.candidate.update({
          where: { id: existingCandidate.id },
          data: {
            role: candidate.role,
            region: candidate.region,
            status: 'ACTIVE',
          },
        });
      } else {
        await prisma.candidate.create({
          data: {
            ...candidate,
            categoryId: savedCategory.id,
          },
        });
      }
    }
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'paklurah';
  const adminPassword = process.env.ADMIN_PASSWORD || 'penganjuran';

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: 'SUPER_ADMIN',
    },
    create: {
      email: adminEmail,
      name: 'Administrator',
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: 'SUPER_ADMIN',
    },
  });

  console.log('Seed database selesai.');
};

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
