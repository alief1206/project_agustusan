const { prisma } = require('../config/prisma');

const toCandidateResult = (candidate, totalVotes) => ({
  id: candidate.id,
  name: candidate.name,
  role: candidate.role,
  region: candidate.region,
  status: candidate.status,
  votes: candidate._count.votes,
  percent: totalVotes === 0 ? 0 : Math.round((candidate._count.votes / totalVotes) * 100),
});

const sortByVotes = (items) =>
  [...items].sort((a, b) => b.votes - a.votes || a.name.localeCompare(b.name));

const getResults = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      candidates: {
        orderBy: { name: 'asc' },
        include: { _count: { select: { votes: true } } },
      },
    },
  });

  return categories.map((category) => {
    const totalVotes = category.candidates.reduce(
      (total, candidate) => total + candidate._count.votes,
      0,
    );
    const candidates = sortByVotes(
      category.candidates.map((candidate) => toCandidateResult(candidate, totalVotes)),
    );

    return {
      id: category.id,
      slug: category.slug,
      name: category.name,
      description: category.description,
      totalVotes,
      candidates,
      topCandidates: candidates.slice(0, 3),
    };
  });
};

const getSummary = async () => {
  const [totalVotes, totalCandidates, activeCategories] = await Promise.all([
    prisma.vote.count(),
    prisma.candidate.count(),
    prisma.category.count({
      where: {
        candidates: {
          some: { status: 'ACTIVE' },
        },
      },
    }),
  ]);

  return {
    participants: totalVotes,
    totalVotes,
    activeCategories,
    totalCandidates,
  };
};

const listResults = async (_req, res) => {
  const data = await getResults();

  return res.json({ data });
};

const getResultsSummary = async (_req, res) => {
  const summary = await getSummary();

  return res.json({ data: summary });
};

const getDashboardStats = async (_req, res) => {
  const [summary, categories] = await Promise.all([getSummary(), getResults()]);

  return res.json({
    data: {
      summary,
      categories,
      topByCategory: categories.map((category) => ({
        id: category.id,
        slug: category.slug,
        name: category.name,
        totalVotes: category.totalVotes,
        candidates: category.topCandidates,
      })),
    },
  });
};

module.exports = {
  getDashboardStats,
  getResultsSummary,
  listResults,
};
