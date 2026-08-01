const { Router } = require('express');

const { createVote, listVotes, deleteVote } = require('../controllers/vote.controller');
const { authenticateAdmin } = require('../middleware/auth');
const { asyncHandler } = require('../utils/asyncHandler');

const router = Router();

router.get('/', authenticateAdmin, asyncHandler(listVotes));
router.post('/', asyncHandler(createVote));
router.delete('/:id', authenticateAdmin, asyncHandler(deleteVote));

module.exports = router;
