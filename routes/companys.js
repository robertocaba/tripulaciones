const express = require("express");
const router = express.Router();
const CompanyController = require("../controllers/CompanyController");
const {
  authentication,
  isAdmin,
  isAuthor,
} = require("../middlewares/authentication");

router.post("/", CompanyController.create);
router.get("/confirm/:emailToken", CompanyController.confirm);

module.exports = router;