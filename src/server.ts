import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute";
import postRoute from "./routes/postRoute";
import storyRoute from "./routes/storyRoute";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


require('dotenv').config()

const port = process.env.PORT;


app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute);
app.use('/api/story', storyRoute);
app.use('/public/uploads',express.static('public/uploads'))

app.listen(port, () => {console.log(`Server Running on Port:${port}`)});

