import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import PostRoutes from "./routes/postRoutes";
import UserRoutes from "./routes/userRoutes";
import errHandler from "./middleWare/errHandler";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.use("/post", PostRoutes);
app.use("/user", UserRoutes);

app.use("*", (req: Request, res: Response) => {
	res.status(404).json({ message: "URL does not exists" });
});

app.listen(PORT, () => {
	console.log(`SERVER RUNNING IN ${PORT}`);
});

app.use(errHandler);
