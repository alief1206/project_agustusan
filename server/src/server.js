const app = require('./app');
const { env } = require('./config/env');
const { prisma } = require('./config/prisma');

const server = app.listen(env.PORT, () => {
  console.log(`Backend berjalan di http://localhost:${env.PORT}`);
});

const shutdown = async () => {
  console.log('Menutup koneksi backend...');
  await prisma.$disconnect();
  server.close(() => process.exit(0));
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
