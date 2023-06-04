import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";

export const useFetchTasks = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState<any>(null);
  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  async function fetchData() {
    try {
      const todosCollRef = collection(db, "todos");
      const res = await getDocs(todosCollRef);
      const todosRes = res?.docs?.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      setTodos(todosRes);
      const activeTasks = todosRes.filter((task) => task.data.status === "active");
      setActiveCount(activeTasks.length);

      const completedTasks = todosRes.filter((task) => task.data.status === "completed");
      setCompletedCount(completedTasks.length);
    } catch (err) {
      setError("Failed to load todos");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  const onDataFilter = async (status: string) => {
    try {
      const todosRef = collection(db, "todos");
      let res: any = "";
      if (status === "all") {
        res = query(todosRef, where("status", "!=", status));
      } else {
        res = query(todosRef, where("status", "==", status));
      }
      const querySnapshot = await getDocs(res);
      const r: any = [];
      querySnapshot.forEach((doc) => {
        r.push({ data: doc.data(), id: doc.id });
      });
      setTodos(r);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { loading, error, todos, setTodos, fetchData, onDataFilter, activeCount, completedCount };
};
