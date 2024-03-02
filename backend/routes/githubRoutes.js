const express = require('express');
const router = express.Router();

const {getRepoDetails,checkUsername,githubProfile, setGithubData, getGithubData} = require('../controllers/githubControllers');
const {auth} = require('../middleware/authMiddleware')
const {authPublic} =require("../middleware/publicMiddleware");

router.route('/profile').get(auth,githubProfile).post(authPublic,githubProfile);
router.route('/repo').get(auth,getRepoDetails).post(authPublic,getRepoDetails)
router.route('/exist').post(auth,checkUsername)
router.route('/setGithubData').post(auth, setGithubData);
router.route('/getGithubData').get(auth, getGithubData);

module.exports = router;
