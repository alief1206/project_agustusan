require('dotenv').config();

const bcrypt = require('bcryptjs');
const { prisma } = require('../config/prisma');

const rtCandidates = [
  { name: 'EKO RETNANI', role: 'Ketua Rt. 01/01 welaran', region: 'Welaran' },
  { name: 'NANANG ARIYANTO', role: 'Ketua Rt. 02/01 welaran', region: 'Welaran' },
  { name: 'RESTU WAHYU PRASTIYO', role: 'Ketua Rt. 03/01 welaran', region: 'Welaran' },
  { name: 'FARID ANDI PRASETYA', role: 'Ketua Rt. 04/01 welaran', region: 'Welaran' },
  { name: 'YULIAWAN', role: 'Ketua Rt. 01/02 welaran', region: 'Welaran' },
  { name: 'IMAM HARIYADI', role: 'Ketua Rt. 02/02 welaran', region: 'Welaran' },
  { name: 'DJATMIKO IWAN S', role: 'Ketua Rt. 03/02 welaran', region: 'Welaran' },
  { name: 'BAMBANG MAHRUS', role: 'Ketua Rt. 04/02 welaran', region: 'Welaran' },
  { name: 'UNTUNG SUPRIYADI', role: 'Ketua Rt. 05/02 welaran', region: 'Welaran' },
  { name: 'NANANG ARIEF SANDI', role: 'Ketua Rt. 01/03 welaran', region: 'Welaran' },
  { name: 'SUYATNO', role: 'Ketua Rt. 02/03 welaran', region: 'Welaran' },
  { name: 'MOH SHOLEH', role: 'Ketua Rt. 03/03 welaran', region: 'Welaran' },
  { name: 'SEPTIAN BAGUS HERMAWAN', role: 'Ketua Rt. 01/01 mulyoasri', region: 'MulyoAsri' },
  { name: 'HARIYADI', role: 'Ketua Rt. 02/01 mulyoasri', region: 'MulyoAsri' },
  { name: 'IHSAN ROSADI', role: 'Ketua Rt. 03/01 mulyoasri', region: 'MulyoAsri' },
  { name: 'NURCHOLIS NAPIS', role: 'Ketua Rt. 01/02 mulyoasri', region: 'MulyoAsri' },
  { name: 'NDENDEN WINSOND', role: 'Ketua Rt. 02/02 mulyoasri', region: 'MulyoAsri' },
  { name: 'ASMUNI', role: 'Ketua Rt. 03/02 mulyoasri', region: 'MulyoAsri' },
  { name: 'SUWOYO', role: 'Ketua Rt. 01/03 mulyoasri', region: 'MulyoAsri' },
  { name: 'M SAEPUdin', role: 'Ketua Rt. 02/03 mulyoasri', region: 'MulyoAsri' },
  { name: 'YULI TRI ANANDA', role: 'Ketua Rt. 03/03 mulyoasri', region: 'MulyoAsri' },
  { name: 'TRI KUSWINARTO', role: 'Ketua Rt. 01/01 krajan', region: 'Krajan' },
  { name: 'SULASTRI', role: 'Ketua Rt. 02/01 krajan', region: 'Krajan' },
  { name: 'IMAM IZUDIN', role: 'Ketua Rt. 03/01 krajan', region: 'Krajan' },
  { name: 'SURAJI', role: 'Ketua Rt. 04/01 krajan', region: 'Krajan' },
  { name: 'ABO RASYID', role: 'Ketua Rt. 01/02 krajan', region: 'Krajan' },
  { name: 'KHUSNUL YAKIN', role: 'Ketua Rt. 02/02 krajan', region: 'Krajan' },
  { name: 'SARIU', role: 'Ketua Rt. 03/02 krajan', region: 'Krajan' },
  { name: 'BUSAIRI', role: 'Ketua Rt. 01/03 krajan', region: 'Krajan' },
  { name: 'AGUS EKO SUSANTO', role: 'Ketua Rt. 02/03 krajan', region: 'Krajan' },
  { name: 'WIWIT SUWITO', role: 'Ketua Rt. 03/03 krajan', region: 'Krajan' },
  { name: 'FATUROHMAN', role: 'Ketua Rt. 04/03 krajan', region: 'Krajan' },
];

const rwCandidates = [
  { name: 'BUDI SANTOSO', role: 'Ketua RW. Welaran/ 01', region: 'Welaran' },
  { name: 'SUTRISNO', role: 'Ketua RW. Welaran/ 02', region: 'Welaran' },
  { name: 'PURWO SETYO ADI', role: 'Ketua RW. Welaran / 03', region: 'Welaran' },
  { name: 'BAMBANG LUKITO', role: 'Ketua RW. MulyoAsri / 01', region: 'MulyoAsri' },
  { name: 'MUZAKI', role: 'Ketua RW. MulyoAsri / 02', region: 'MulyoAsri' },
  { name: 'BUDI EKO PURWANTO', role: 'Ketua RW. MulyoAsri / 03', region: 'MulyoAsri' },
  { name: 'JOKO SUPRIYO', role: 'Ketua RW. Krajan / 01', region: 'Krajan' },
  { name: 'AHMAD AUNUR ROHIM', role: 'Ketua RW. Krajan / 02', region: 'Krajan' },
  { name: 'KHAIRUL ANAM', role: 'Ketua RW. Krajan / 03', region: 'Krajan' },
];

const posyanduCandidates = [
  // 1. APEL
  { name: 'SITI RAHMANIAH', role: 'Kader Posyandu APEL' },
  { name: 'MUIDAYANTI', role: 'Kader Posyandu APEL' },
  { name: 'SITI MASITAH', role: 'Kader Posyandu APEL' },
  { name: 'SULIS EKOWASIH', role: 'Kader Posyandu APEL' },
  { name: 'SINTA KAROHMAH', role: 'Kader Posyandu APEL' },
  // 2. JERUK
  { name: 'SUSILOWATI', role: 'Kader Posyandu JERUK' },
  { name: 'DIANA DWI SETYOWATI', role: 'Kader Posyandu JERUK' },
  { name: 'DINA WAHYUNI', role: 'Kader Posyandu JERUK' },
  { name: 'ROBEUL AWALIYAH S.Pd', role: 'Kader Posyandu JERUK' },
  { name: 'SHOFIA SETYA JANJI', role: 'Kader Posyandu JERUK' },
  // 3. NANAS
  { name: 'ISTIANI', role: 'Kader Posyandu NANAS' },
  { name: 'YUSNITA KHOIRINA', role: 'Kader Posyandu NANAS' },
  { name: 'ENDANG APRININGSIH', role: 'Kader Posyandu NANAS' },
  { name: 'MARIANA ULFA', role: 'Kader Posyandu NANAS' },
  { name: 'ASTRI NURYANTI', role: 'Kader Posyandu NANAS' },
  // 4. GARBIS
  { name: 'NURHAYATI', role: 'Kader Posyandu GARBIS' },
  { name: 'HERDINDA', role: 'Kader Posyandu GARBIS' },
  { name: 'NANIK SUGIANTI', role: 'Kader Posyandu GARBIS' },
  { name: 'IQNAIR ROHMANI', role: 'Kader Posyandu GARBIS' },
  { name: 'ALIYAH', role: 'Kader Posyandu GARBIS' },
  // 5. MELON
  { name: 'SUSIANA', role: 'Kader Posyandu MELON' },
  { name: 'DAYUL INTAN', role: 'Kader Posyandu MELON' },
  { name: 'DIYAN LUSIYANA', role: 'Kader Posyandu MELON' },
  { name: 'DIAH AYUNINGRUM', role: 'Kader Posyandu MELON' },
  { name: 'DEVIA NINGSIH', role: 'Kader Posyandu MELON' },
  // 6. PEPAYA
  { name: 'RULIEN PRIHATINA', role: 'Kader Posyandu PEPAYA' },
  { name: 'ASLIKAH', role: 'Kader Posyandu PEPAYA' },
  { name: 'SRI WAHYUNI', role: 'Kader Posyandu PEPAYA' },
  { name: 'DARWATI', role: 'Kader Posyandu PEPAYA' },
  { name: 'TRI SUPRAPTI', role: 'Kader Posyandu PEPAYA' },
  { name: 'TRI YUNIATI', role: 'Kader Posyandu PEPAYA' },
  // 7. SALAK
  { name: 'DIAN MAHENDRAWATI', role: 'Kader Posyandu SALAK' },
  { name: 'SITTI AMINAH', role: 'Kader Posyandu SALAK' },
  { name: 'RITA FITRIA', role: 'Kader Posyandu SALAK' },
  { name: 'LINA ANDRIYANI', role: 'Kader Posyandu SALAK' },
  // 8. MANGGA
  { name: 'ENITA LISTYANINGSIH', role: 'Kader Posyandu MANGGA' },
  { name: 'ASMAUL HUSNA', role: 'Kader Posyandu MANGGA' },
  { name: 'EKA SEPTRIPIANA', role: 'Kader Posyandu MANGGA' },
  { name: 'SULISTYO RAHAYUNINGSIH', role: 'Kader Posyandu MANGGA' },
  { name: 'DIDIK PURWADI', role: 'Kader Posyandu MANGGA' },
  // 9. DURIAN
  { name: 'SUHARIYANI', role: 'Kader Posyandu DURIAN' },
  { name: 'SAIDA LESTARI', role: 'Kader Posyandu DURIAN' },
  { name: 'SITI WAKIAH', role: 'Kader Posyandu DURIAN' },
  { name: 'ENI BUDI HARYATI', role: 'Kader Posyandu DURIAN' },
  { name: 'RIA OKTAFIANA', role: 'Kader Posyandu DURIAN' },
  // 10. SEMANGKA
  { name: 'JAMILAH', role: 'Kader Posyandu SEMANGKA' },
  { name: 'UMI ROMLAH', role: 'Kader Posyandu SEMANGKA' },
  { name: 'MARDIYAH HAYATI', role: 'Kader Posyandu SEMANGKA' },
  { name: 'NOFITA DWI KARMILA', role: 'Kader Posyandu SEMANGKA' },
  { name: 'RINI HENDRAWATI', role: 'Kader Posyandu SEMANGKA' },
  // 11. MANGGIS
  { name: 'HOLILAH', role: 'Kader Posyandu MANGGIS' },
  { name: 'ASNIYAH', role: 'Kader Posyandu MANGGIS' },
  { name: 'MUJAYANAH', role: 'Kader Posyandu MANGGIS' },
  { name: 'SITI HALIMAH', role: 'Kader Posyandu MANGGIS' },
  { name: 'SUPRIHATIN', role: 'Kader Posyandu MANGGIS' },
  // 12. ANGGUR
  { name: 'SRI UTAMI', role: 'Kader Posyandu ANGGUR' },
  { name: 'SULASTRI', role: 'Kader Posyandu ANGGUR' },
  { name: 'AMINDIATI', role: 'Kader Posyandu ANGGUR' },
  { name: 'FARIDA', role: 'Kader Posyandu ANGGUR' },
  { name: 'MARDIATUN NASUHA', role: 'Kader Posyandu ANGGUR' },
];

const categoriesData = [
  { slug: 'rt', name: 'Kandidat RT Terfavorit', candidates: rtCandidates },
  { slug: 'rw', name: 'Kandidat RW Terfavorit', candidates: rwCandidates },
  { slug: 'posyandu', name: 'Kader Posyandu Terfavorit', candidates: posyanduCandidates },
];

const seed = async () => {
  console.log('Memulai proses seed database...');

  for (const catData of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: catData.slug },
      update: { name: catData.name },
      create: { slug: catData.slug, name: catData.name },
    });

    console.log(`Menambahkan kandidat untuk ${catData.name}...`);
    for (const item of catData.candidates) {
      await prisma.candidate.upsert({
        where: {
          categoryId_name: {
            categoryId: category.id,
            name: item.name,
          },
        },
        update: {
          role: item.role,
          region: item.region || null,
          status: 'ACTIVE',
        },
        create: {
          name: item.name,
          role: item.role,
          region: item.region || null,
          categoryId: category.id,
          status: 'ACTIVE',
        },
      });
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

  console.log('Seed database selesai dengan sukses!');
};

seed()
  .catch((error) => {
    console.error('Error saat seed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
