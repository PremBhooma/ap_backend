const express = require("express")
const router = express.Router()
const { uploadS3AiToolImage } = require("../middlewares/s3-file-upload")
const Controller = require("../controllers/AiTool.controller")

router.post("/create", uploadS3AiToolImage.single("image"), Controller.CreateAiTool);
router.patch("/edit", uploadS3AiToolImage.single("image"), Controller.editAiTool);
// router.get("/get", Controller.getAllCategory);
// router.delete("/delete/:id", Controller.deleteCategory);

module.exports = router
