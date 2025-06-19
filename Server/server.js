import "dotenv/config"
import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoute.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from "./routes/userRoute.js";
import passport from "passport";
import session from "express-session";
import './utility/passport.js';
const app = express();

const PORT = process.env.PORT || 6000;

const allowedOrigins = [
    'http://localhost:5173',
    'https://secure-flow-auth.vercel.app',
];
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:allowedOrigins, credentials: true}));    


app.use(
  session({
    secret: 'secureflowauth',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());


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