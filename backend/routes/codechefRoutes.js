const express = require('express');
const router = express.Router();

const {auth} = require('../middleware/authMiddleware')
const {getCodeChefDetails,checkCfUsername, setCodeChefData, getCodeChefData} = require("../controllers/codechefControllers");
const {authPublic} =require("../middleware/publicMiddleware");


router.route("/details").get(auth,getCodeChefDetails).post(authPublic,getCodeChefDetails);
router.route('/exist').post(auth,checkCfUsername);
router.route('/ccData').post(auth,setCodeChefData).get(auth,getCodeChefData);
module.exports = router;