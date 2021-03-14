const router = require('express').Router();

const {
  getUserMe, editProfile,
} = require('../controllers/users.js');

router.get('/me', getUserMe);
router.patch('/me', editProfile);

module.exports = router;
