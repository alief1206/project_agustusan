const { z } = require('zod');

const { prisma } = require('../config/prisma');

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const optionalText = z.preprocess(
  (value) => (value === '' ? undefined : value),
  z.string().trim().optional(),
);

const candidateSchema = z.object({
  name: z.string().trim().min(2),
  role: z.string().trim().min(2),
  region: optionalText,
  photoUrl: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.string().url().optional(),
  ),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  categoryId: z.string().min(1),
});

const createCategorySchema = z.object({
  slug: optionalText,
  name: z.string().trim().min(2),
  description: optionalText,
});

const updateCategorySchema = z.object({
  slug: optionalText,
  name: optionalText,
  description: optionalText,
});

const prepareCategoryData = (data) => {
  if (data.slug || data.name) {
    return {
      ...data,
      slug: slugify(data.slug || data.name),
    };
  }

  return data;
};

const listCategories = async (_req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      candidates: {
        orderBy: { name: 'asc' },
        include: { _count: { select: { votes: true } } },
      },
    },
  });

  return res.json({ data: categories });
};

const createCategory = async (req, res) => {
  const data = prepareCategoryData(createCategorySchema.parse(req.body));
  const category = await prisma.category.create({ data });

  return res.status(201).json({ data: category });
};

const updateCategory = async (req, res) => {
  const data = prepareCategoryData(updateCategorySchema.parse(req.body));
  const category = await prisma.category.update({
    where: { id: req.params.id },
    data,
  });

  return res.json({ data: category });
};

const deleteCategory = async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id } });

  return res.status(204).send();
};

const listCandidates = async (req, res) => {
  const { categoryId, status } = req.query;

  const candidates = await prisma.candidate.findMany({
    where: {
      ...(categoryId ? { categoryId: String(categoryId) } : {}),
      ...(status ? { status: String(status).toUpperCase() } : {}),
    },
    orderBy: { name: 'asc' },
    include: {
      category: true,
      _count: { select: { votes: true } },
    },
  });

  return res.json({ data: candidates });
};

const createCandidate = async (req, res) => {
  const data = candidateSchema.parse(req.body);
  const candidate = await prisma.candidate.create({ data });

  return res.status(201).json({ data: candidate });
};

const updateCandidate = async (req, res) => {
  const data = candidateSchema.partial().parse(req.body);
  const candidate = await prisma.candidate.update({
    where: { id: req.params.id },
    data,
  });

  return res.json({ data: candidate });
};

const deleteCandidate = async (req, res) => {
  await prisma.candidate.delete({ where: { id: req.params.id } });

  return res.status(204).send();
};

module.exports = {
  createCandidate,
  createCategory,
  deleteCandidate,
  deleteCategory,
  listCandidates,
  listCategories,
  updateCandidate,
  updateCategory,
};
