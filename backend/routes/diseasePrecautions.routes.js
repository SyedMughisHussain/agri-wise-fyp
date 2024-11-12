import express from "express";

import { diseasePrecautions } from "../controllers/diseasePrecautions.controllers.js";

const router = express.Router();

router.route("/diseasePrecautions").post(diseasePrecautions);

export default router;
