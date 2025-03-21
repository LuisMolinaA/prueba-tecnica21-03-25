import express, { Application } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { Signale } from "signale";
import { initializeDatabase } from "./database/database";
import passport from "passport";
import { userRouter } from "./routes/userRouter";
import { domicilioRouter } from "./routes/domicilioRouter";

const app: Application = express();
const signale = new Signale();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(passport.initialize());

//rutas
app.use("/auth", userRouter);
app.use("/domicilio", domicilioRouter)
const PORT = process.env.PORT || 3000;

initializeDatabase();

app.listen(PORT, () => {
    signale.success(`Server running at http://localhost:${PORT}`);
});