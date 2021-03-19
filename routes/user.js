const router = require('express').Router();
const { validateUpdateProfile } = require('../middlewares/validation.js');

const {
  getUserMe, editProfile,
} = require('../controllers/users.js');

router.get('/me', getUserMe);
router.patch('/me', validateUpdateProfile, editProfile);

module.exports = router;
