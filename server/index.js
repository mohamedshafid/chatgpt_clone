const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3080;

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyAnMMWiTTomO57_AWu6OPFJuhv8DR8Hl9I");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res, next) => {
  const { message } = req.body;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(message);
  const response = await result.response;
  const text = response.text();
  res.json({
    message: text,
  });
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
