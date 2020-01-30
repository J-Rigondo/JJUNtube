import app from "./app";
import "./db";
import dotenv from "dotenv";
dotenv.config();
import "./models/video";
import "./models/comment";

const PORT = process.env.PORT;

const handleListening = () => {
  console.log(`Listen on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
