import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Board />
    </main>
  );
}

interface TTask {
  id: string;
  title: string;
  description: string;
  assigneeName: string;
  assigneeAvatarUrl: string;
  status: "todo" | "inProgress" | "done";
  orderIndex: number;
}

const initialTasks: TTask[] = [
  {
    id: "1",
    title: "Implement user authentication",
    description:
      "Create a user authentication system using Firebase Authentication.",
    assigneeName: "John Doe",
    assigneeAvatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    status: "todo",
    orderIndex: 0,
  },
  {
    id: "2",
    title: "Design landing page",
    description: "Design a landing page for the website using Figma or Sketch.",
    assigneeName: "Jane Smith",
    assigneeAvatarUrl:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    status: "todo",
    orderIndex: 1,
  },
  {
    id: "3",
    title: "Setup Redux store",
    description: "Setup Redux store for managing state in the application.",
    assigneeName: "John Doe",
    assigneeAvatarUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    status: "inProgress",
    orderIndex: 0,
  },
  {
    id: "4",
    title: "Implement task board UI",
    description: "Implement the task board UI using React and Tailwind CSS.",
    assigneeName: "Jane Smith",
    assigneeAvatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    status: "inProgress",
    orderIndex: 1,
  },
  {
    id: "5",
    title: "Add unit tests",
    description: "Add unit tests for the application using Jest and Enzyme.",
    assigneeName: "John Doe",
    assigneeAvatarUrl:
      "https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    status: "done",
    orderIndex: 0,
  },
  {
    id: "6",
    title: "Deploy application to AWS",
    description: "Deploy the application to AWS using EC2 and S3.",
    assigneeName: "Jane Smith",
    assigneeAvatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    status: "done",
    orderIndex: 1,
  },
];
import { resetServerContext } from "react-beautiful-dnd";

function Board() {
  resetServerContext();
  const [tasks, setTasks] = useState<TTask[]>(
    initialTasks.sort((a, b) => a.orderIndex - b.orderIndex)
  );
  // .sort((a, b) => a.orderIndex - b.orderIndex)
  const statuses = ["todo", "inProgress", "done"];

  function handleOnDragEnd(result: DropResult) {
    console.log("result", result);
  }

  return (
    <div className="flex justify-center">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="flex flex-col lg:flex-row gap-6 w-full min-h-[100svh]">
          {/* Column/Status */}
          {statuses.map((status) => {
            const tasksByStatus = tasks.filter(
              (task) => task.status === status
            );
            return (
              <div
                key={status}
                className="w-full lg:w-1/3 p-4 bg-gray-100/80 h-full"
              >
                <h2 className="text-lg font-bold mb-4">{status}</h2>
                <Droppable droppableId={status}>
                  {(provided) => (
                    <div
                      className="space-y-4"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {/* Tasks */}
                      {tasksByStatus.map((task, index) => (
                        <Draggable
                          key={task.id.toString()}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="border rounded-lg p-4 mb-4 bg-white"
                            >
                              <h3 className="font-bold text-lg mb-2">
                                {task.title}
                              </h3>
                              <p className="text-gray-700">
                                {task.description}
                              </p>
                              <div className="flex justify-between items-center gap-2 mt-4">
                                <div className="flex items-center">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    className="w-10 h-10 rounded-full mr-2 object-cover"
                                    src={task.assigneeAvatarUrl}
                                    alt="Assignee avatar"
                                  />
                                  <span className="text-gray-700">
                                    {task.assigneeName}
                                  </span>
                                </div>
                                <span
                                  className={`px-2 py-1 rounded-full font-bold text-sm ${
                                    task.status === "done"
                                      ? "bg-green-500 text-white"
                                      : "bg-gray-300 text-gray-700"
                                  }`}
                                >
                                  {task.status}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
