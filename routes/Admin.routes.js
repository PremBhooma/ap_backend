
const express = require("express")
const router = express.Router()
const { uploadS3AdminProfile } = require("../middlewares/s3-file-upload")
const Controller = require("../controllers/Admin.controller")

router.post("/create", uploadS3AdminProfile.single("image"), Controller.createAdmin)
router.post("/login", Controller.adminLogin)

module.exports = router
