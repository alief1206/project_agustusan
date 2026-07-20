const { Router } = require('express');

const {
  getDashboardStats,
  getResultsSummary,
  listResults,
} = require('../controllers/result.controller');
const { asyncHandler } = require('../utils/asyncHandler');

const router = Router();

router.get('/summary', asyncHandler(getResultsSummary));
router.get('/dashboard', asyncHandler(getDashboardStats));
router.get('/', asyncHandler(listResults));

module.exports = router;
