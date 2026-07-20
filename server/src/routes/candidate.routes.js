const { Router } = require('express');

const {
  createCandidate,
  deleteCandidate,
  listCandidates,
  updateCandidate,
} = require('../controllers/candidate.controller');
const { authenticateAdmin } = require('../middleware/auth');
const { asyncHandler } = require('../utils/asyncHandler');

const router = Router();

router.get('/', asyncHandler(listCandidates));
router.post('/', authenticateAdmin, asyncHandler(createCandidate));
router.patch('/:id', authenticateAdmin, asyncHandler(updateCandidate));
router.delete('/:id', authenticateAdmin, asyncHandler(deleteCandidate));

module.exports = router;
