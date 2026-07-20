const { Router } = require('express');

const {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} = require('../controllers/candidate.controller');
const { authenticateAdmin } = require('../middleware/auth');
const { asyncHandler } = require('../utils/asyncHandler');

const router = Router();

router.get('/', asyncHandler(listCategories));
router.post('/', authenticateAdmin, asyncHandler(createCategory));
router.patch('/:id', authenticateAdmin, asyncHandler(updateCategory));
router.delete('/:id', authenticateAdmin, asyncHandler(deleteCategory));

module.exports = router;
