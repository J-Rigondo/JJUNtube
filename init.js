import dotenv from 'dotenv';
import app from './app';
import './db';
import './models/video';
import './models/comment';
import './models/user';

dotenv.config();

const PORT = process.env.PORT;

const handleListening = () => {
  console.log(`Listen on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
