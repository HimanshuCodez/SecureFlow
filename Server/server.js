import "dotenv/config"
import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoute.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from "./routes/userRoute.js";

const app = express();

const PORT = process.env.PORT || 6000;

const allowedOrigins = [
    'http://localhost:5173',
    'https://your-production-domain.com',
];
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true,origin:allowedOrigins}));    


app.get('/', (req, res) => {
    res.send('Hello World!');
});     

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

mongoose.connect(process.env.MongodbURI, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});