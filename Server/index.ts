import express from "express";
import taskRoutes from "./src/router/taskRoutes";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT);
