import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const detectDisease = async (req, res) => {
  try {
    const imagePath = req.file.path;

    console.log(imagePath);

    const generatedResponse = await model.generateContent([
      "your task is to identify plant health issues with precision. Analyze any image of a plant or leaf I provide, and detect all abnormal conditions, whether they are diseases, pests, deficiencies, or decay. Respond strictly with the name of the condition identified, and nothing else—no explanations, no additional text. If a condition is unrecognizable, reply with 'I don't know'. If the image is not plant-related, say 'Please pick another image'",
      {
        inlineData: {
          data: Buffer.from(fs.readFileSync(`./${imagePath}`)).toString(
            "base64"
          ),
          mimeType: "image/jpeg",
        },
      },
    ]);

    res.status(200).json({
      sucess: true,
      data: generatedResponse.response.text(),
      error: false,
    });
  } catch (error) {
    res.status(404).json({
      sucess: false,
      message: error.message,
      error: true,
    });
  }
};

export { detectDisease };
