import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routing/user-routes';
import postRouter from './routing/post-router';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();
const Port=process.env.Port || 5000;

app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use("/posts",postRouter);


mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
  .then(() => app.listen(Port, () => console.log('Connection successful & listening to the port 5000')))
  .catch((err) => console.log(err));
