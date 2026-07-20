require('dotenv').config();

const mariadb = require('mariadb');

const { parseDatabaseUrl } = require('../config/databaseUrl');

const statements = [
  `CREATE TABLE IF NOT EXISTS \`Category\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`slug\` VARCHAR(191) NOT NULL,
    \`name\` VARCHAR(191) NOT NULL,
    \`description\` VARCHAR(191) NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`Category_slug_key\` (\`slug\`)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`Candidate\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`name\` VARCHAR(191) NOT NULL,
    \`role\` VARCHAR(191) NOT NULL,
    \`region\` VARCHAR(191) NULL,
    \`photoUrl\` VARCHAR(191) NULL,
    \`status\` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    \`categoryId\` VARCHAR(191) NOT NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`Candidate_categoryId_name_key\` (\`categoryId\`, \`name\`),
    KEY \`Candidate_categoryId_idx\` (\`categoryId\`),
    KEY \`Candidate_status_idx\` (\`status\`),
    CONSTRAINT \`Candidate_categoryId_fkey\`
      FOREIGN KEY (\`categoryId\`) REFERENCES \`Category\`(\`id\`)
      ON DELETE CASCADE ON UPDATE CASCADE
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`Vote\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`candidateId\` VARCHAR(191) NOT NULL,
    \`categoryId\` VARCHAR(191) NOT NULL,
    \`voterName\` VARCHAR(191) NOT NULL,
    \`voterNameKey\` VARCHAR(191) NOT NULL,
    \`voterAddress\` VARCHAR(191) NOT NULL,
    \`voterAddressKey\` VARCHAR(191) NOT NULL,
    \`ipAddress\` VARCHAR(191) NULL,
    \`userAgent\` VARCHAR(191) NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`Vote_voterNameKey_voterAddressKey_key\` (\`voterNameKey\`, \`voterAddressKey\`),
    KEY \`Vote_candidateId_idx\` (\`candidateId\`),
    KEY \`Vote_categoryId_idx\` (\`categoryId\`),
    CONSTRAINT \`Vote_candidateId_fkey\`
      FOREIGN KEY (\`candidateId\`) REFERENCES \`Candidate\`(\`id\`)
      ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT \`Vote_categoryId_fkey\`
      FOREIGN KEY (\`categoryId\`) REFERENCES \`Category\`(\`id\`)
      ON DELETE CASCADE ON UPDATE CASCADE
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`AdminUser\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`email\` VARCHAR(191) NOT NULL,
    \`name\` VARCHAR(191) NULL,
    \`passwordHash\` VARCHAR(191) NOT NULL,
    \`role\` ENUM('ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'ADMIN',
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`AdminUser_email_key\` (\`email\`)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
];

const main = async () => {
  const connection = await mariadb.createConnection(parseDatabaseUrl(process.env.DATABASE_URL));

  for (const statement of statements) {
    await connection.query(statement);
  }

  await connection.end();
  console.log('Schema MySQL berhasil disiapkan.');
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
