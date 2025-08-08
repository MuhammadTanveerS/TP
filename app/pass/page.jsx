"use client"; // Needed for client-side logic

import AddNotesForm from "../secret/page";

import { useState, useEffect } from "react";

const CORRECT_PASSCODE = "weareanonymous"; // Replace this with your passcode

export default function ProtectedPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Optional: check localStorage to persist auth
    const storedCode = localStorage.getItem("passcode");
    if (storedCode === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
      localStorage.setItem("passcode", passcode); // Optional: remember it
    } else {
      alert("Incorrect passcode");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-xl mb-4">Enter Passcode to Access Page</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter passcode"
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
        <AddNotesForm />
    </>
  );
}
