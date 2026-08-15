import type { Request, Response } from "express";
import pool from "../config/db";

class TaskController {
  // Get all tasks
  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("SELECT * FROM tasks");
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get a single task by ID
  async getTaskById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [
        id,
      ]);
      if (result.rows.length === 0) {
        res.status(404).json({ message: "Task not found" });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Create a new task
  async createTask(req: Request, res: Response): Promise<void> {
    const { title } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
        [title]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Update an existing task
  async updateTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
      const result = await pool.query(
        "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
        [title, completed, id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ message: "Task not found" });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Delete a task
  async deleteTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const result = await pool.query(
        "DELETE FROM tasks WHERE id = $1 RETURNING *",
        [id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ message: "Task not found" });
      } else {
        res.status(200).json({ message: "Task deleted successfully" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new TaskController();
