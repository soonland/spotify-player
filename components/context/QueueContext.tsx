import { createContext, useEffect, useState } from "react";
import { IQueueItem } from "@/models/types";

interface IQueueContext {
  queue: IQueueItem[];
  addToQueue: (item: IQueueItem) => void;
  clearQueue: () => void;
  removeFromQueue: (itemId: string) => void;
}

export const QueueContext = createContext<IQueueContext>({
  queue: [],
  addToQueue: () => {},
  clearQueue: () => {},
  removeFromQueue: () => {},
});

export const QueueProvider = ({ children }) => {
  // Load queue from sessionStorage on hook initialization
  const [queue, setQueue] = useState<IQueueItem[]>([]);
  useEffect(() => {
    if (sessionStorage.getItem("queue")) {
      setQueue(JSON.parse(sessionStorage.getItem("queue") as string));
    }
  }, []);

  // Save queue to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("queue", JSON.stringify(queue));
  }, [queue]);

  // Function to add an item to the queue
  const addToQueue = (item: IQueueItem) => {
    // Check if the item is already in the queue
    const itemExists = queue.find((queueItem) => queueItem.id === item.id);
    if (itemExists) {
      return;
    }
    setQueue([...queue, item]);
  };

  // Function to clear the entire queue
  const clearQueue = () => {
    setQueue([]);
  };

  // Function to remove a specific item from the queue
  const removeFromQueue = (itemId) => {
    const updatedQueue = JSON.parse(sessionStorage.getItem("queue") as string).filter((item) => item.id !== itemId);
    setQueue(updatedQueue);
  };

  return (
    <QueueContext.Provider value={{ queue, addToQueue, clearQueue, removeFromQueue }}>{children}</QueueContext.Provider>
  );
};
