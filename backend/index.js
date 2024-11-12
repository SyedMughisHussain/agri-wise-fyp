import express from "express";

import "dotenv/config";

import detectDiseaseRoutes from "./routes/detectDisease.routes.js";
import diseasePrecautionsRoutes from "./routes/diseasePrecautions.routes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World!",
    error: false,
    data: null,
  });
});

app.use("/api/v1/image", detectDiseaseRoutes);
app.use("/api/v1/image", diseasePrecautionsRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
