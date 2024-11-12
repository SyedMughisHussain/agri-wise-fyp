import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const diseasePrecautions = async (req, res) => {
  try {
    const { disease } = req.body;

    const result = await model.generateContent(
      `upon receiving the name of a plant disease, provide three precautionary measures using numbers bullet points, to prevent or manage the disease. These measures should be concise, clear, and limited to one sentence each. No additional information or context is needed—only the three precautions in bullet-point format. The disease is ${disease}`
    );

    res.status(200).json({
      sucess: true,
      data: result.response.text(),
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

export { diseasePrecautions };
