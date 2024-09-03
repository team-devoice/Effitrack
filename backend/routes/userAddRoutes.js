const express = require('express');
const router = express.Router();

const {postPersonal , postEducation ,getAddUserDetails , postProject , postCertification , postIntern} = require('../controllers/userAddControllers')
// const fetchContestData = require('../controllers/futureContestController');
const {auth} = require("../middleware/authMiddleware");


// router.route('/').get(auth,getMe).post(authPublic,getMe);
// router.route('/existUsername').post(checkUserExist);
router.route('/').get(auth,getAddUserDetails);
router.route('/personal').post(auth,postPersonal);
router.route('/education').post(auth,postEducation);
router.route('/projects').post(auth,postProject)
router.route('/certificates').post(auth,postCertification)
router.route('/intern').post(auth,postIntern)

module.exports= router;