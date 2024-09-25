import { Router } from "express";
import TaskController from "../Controller/TaskController";

const router = Router();

// Define routes for task operations
router.get("/", TaskController.getAllTasks); // Get all tasks
router.get("/:id", TaskController.getTaskById); // Get a single task by ID
router.post("/", TaskController.createTask); // Create a new task
router.put("/:id", TaskController.updateTask); // Update an existing task
router.delete("/:id", TaskController.deleteTask); // Delete a task

export default router;
