const express = require('express');
const router = express.Router();

const {postPersonal , postEducation ,getAddUserDetails} = require('../controllers/userAddControllers')
// const fetchContestData = require('../controllers/futureContestController');
const {auth} = require("../middleware/authMiddleware");


// router.route('/').get(auth,getMe).post(authPublic,getMe);
// router.route('/existUsername').post(checkUserExist);
router.route('/').get(auth,getAddUserDetails);
router.route('/personal').post(auth,postPersonal);
router.route('/education').post(auth,postEducation);

module.exports= router;