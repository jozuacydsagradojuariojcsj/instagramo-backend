import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute"

const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config()

const port = process.env.PORT;


app.use('/auth',authRoute);

app.listen(port, () => {console.log(`Server Running on Port:${port}`)});

