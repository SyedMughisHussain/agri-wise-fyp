import express from "express";

import { upload } from "../middlewares/multer.js";
import { detectDisease } from "../controllers/detectDisease.controllers.js";

const router = express.Router();

router.route("/detectDisease").post(upload.single("image"), detectDisease);

export default router;
