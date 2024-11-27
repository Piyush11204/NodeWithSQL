const express = require('express');
const router = express.Router();
const schoolController = require('../controller/schoolController.js');

// Add School API
router.post('/addSchool', schoolController.addSchool);

// List Schools API
router.get('/listSchools', schoolController.listSchools);

router.delete('/deleteSchool', schoolController.deleteSchool);

router.put('/updateSchool', schoolController.updateSchool);

module.exports = router;
