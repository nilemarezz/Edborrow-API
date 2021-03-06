const express = require("express");
const router = express.Router();
const { getUserDetail, userLogin, getUserRole, userRegister, ChangePassword, GetAdvisorList, GetUserList, DeleteUser, CreateUser, userAuthSSO } = require("../Controller/User")
const verifyToken = require('../middleware/verify')
const validUser = require('../middleware/validUser')
const config = require('../config.json')

const CryptoJS = require("crypto-js");
const pool = require("../config/BorrowSystemDB");
router
  .route("/")
  .get(verifyToken, validUser, GetUserList)
  .put(verifyToken, validUser, ChangePassword)
  .delete(verifyToken, validUser, DeleteUser)
  .post(verifyToken, validUser, CreateUser)
router
  .route("/detail")
  .get(verifyToken, validUser, getUserDetail)
router
  .route("/login")
  .post(userLogin)
router
  .route("/register")
  .post(userRegister)
router
  .route("/list/advisor")
  .get(GetAdvisorList)
router
  .route("/auth")
  .post(userAuthSSO)

router.post("/createAdvisor", async (req, res) => {
  var cipherPassword = CryptoJS.AES.encrypt(
    req.body.password,
    config.CRYPTO_SECRET_KEY
  ).toString();

  const query = await pool.query(
    `INSERT Into Users (userId , password  , firstName  ,lastName ,email ,userTelNo ) 
        values ("${req.body.userId}", "${cipherPassword}" , "${req.body.firstName}" , "${req.body.lastName}" , "${req.body.email}" , "${req.body.userTelNo}")`
  );
  const query2 = await pool.query(
    `INSERT into UserRole (userId ,roleId ) values ("${req.body.userId}" , "${req.body.roleId}")`
  );
  res.send('success')
});
// router
//     .route("/role")
//     .get(verifyToken,validUser,getUserRole)


module.exports = router;