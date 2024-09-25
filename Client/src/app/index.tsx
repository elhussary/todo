import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Task } from "@/types/api";

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tasks"); // Adjust the URL as needed
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTask }),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const toggleTask = async (id: number) => {
    try {
      const task = tasks.find((task) => task.id === id);
      if (!task) return;

      const updatedTask = { ...task, completed: !task.completed };
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: updatedTask.completed,
          title: updatedTask.title,
        }),
      });

      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="flex-grow mb-5"
            />
            <Button onClick={addTask}>Add</Button>
          </div>

          <ul className="space-y-2">
            {tasks.map((task: Task) => (
              <li key={task.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onClick={() => task.id && toggleTask(task.id)}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`flex-grow ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </label>

                <Button
                  variant={"destructive"}
                  size={"sm"}
                  onClick={() => task.id && deleteTask(task.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
};
