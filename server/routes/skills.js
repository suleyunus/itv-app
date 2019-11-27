const express = require('express');
const skillsControllers = require('../controllers/skills');

const router = express.Router();

router.get('/skills', skillsControllers.getSkill);

module.exports = router;
