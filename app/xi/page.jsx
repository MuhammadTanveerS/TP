"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function StudentsPage2() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "XI"));
        const studentData = [];

        querySnapshot.forEach((doc) => {
          studentData.push({ id: doc.id, ...doc.data() });
        });

        setNotes(studentData);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      {notes.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((student) => (
            <li
              key={student.id}
              className="border p-4 rounded shadow-md bg-white"
            >
              <p><strong>Name:</strong> {student.chapter}</p>
              <p><strong>Age:</strong> {student.link}</p>
              <p><strong>Grade:</strong> {student.topic}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
