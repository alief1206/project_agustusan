require('dotenv').config();

const { prisma } = require('../config/prisma');

const main = async () => {
  const [categories, candidates, admins, votes] = await Promise.all([
    prisma.category.count(),
    prisma.candidate.count(),
    prisma.adminUser.count(),
    prisma.vote.count(),
  ]);

  console.log(
    JSON.stringify(
      {
        categories,
        candidates,
        admins,
        votes,
      },
      null,
      2,
    ),
  );
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
