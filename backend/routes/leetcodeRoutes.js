const express = require("express");
const router = express.Router();
const {getLcCount,getLcRating,checkLcUsername,getLeetcodeBatch} = require('../controllers/leetcodeControllers');
const {auth}  = require('../middleware/authMiddleware')
const {authPublic} =require("../middleware/publicMiddleware");

router.route('/count').get(auth,getLcCount).post(authPublic,getLcCount)
router.route('/rating').get(auth,getLcRating).post(authPublic,getLcRating);
router.route('/exist').post(auth,checkLcUsername)
router.route('/badges').get(auth,getLeetcodeBatch).post(authPublic,getLeetcodeBatch);



module.exports = router;

