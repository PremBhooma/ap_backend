const express = require("express");
const router = express.Router();
const { uploadS3AiToolImage } = require("../middlewares/s3-file-upload");
const Controller = require("../controllers/AiTool.controller");

router.post("/create", uploadS3AiToolImage.single("image"), Controller.CreateAiTool);
router.patch("/edit", uploadS3AiToolImage.single("image"), Controller.editAiTool);
router.get("/get", Controller.getAllAiTool);
router.get("/get-ai-tool-by-id/:id", Controller.getSingleAiTool);
router.delete("/delete/:id", Controller.delete);

module.exports = router;
