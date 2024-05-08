const express = require("express")
const router = express.Router()
// const { uploadS3CategoryProfile } = require("../middlewares/s3-file-upload")
const Controller = require("../controllers/Category.controller")

// router.post("/create", uploadS3CategoryProfile.single("image"), Controller.createCategory);
router.post("/create", Controller.createCategory);
router.patch("/edit", Controller.editCategory);
router.get("/get", Controller.getAllCategory);
router.delete("/delete/:id", Controller.deleteCategory);

module.exports = router
