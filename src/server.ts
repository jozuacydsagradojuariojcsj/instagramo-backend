import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute";
import postRoute from "./routes/postRoute";

const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config()

const port = process.env.PORT;


app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute);

app.listen(port, () => {console.log(`Server Running on Port:${port}`)});

