import { IQueueItem } from "@/models/types";
import { useEffect, useState } from "react";

export const useQueueTracks = () => {
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

  // Calculate queue count
  const queueCount = queue?.length;

  return {
    queue,
    queueCount,
    addToQueue,
    clearQueue,
    removeFromQueue,
  };
};
