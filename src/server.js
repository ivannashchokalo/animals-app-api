import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectMongoDB } from "./db/connectMongoDB.js";
import animalsRoutes from "./routes/animalsRoutes.js";
import requestsRoutes from "./routes/requestsRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errors } from "celebrate";

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/animals", animalsRoutes);
app.use("/request", requestsRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
