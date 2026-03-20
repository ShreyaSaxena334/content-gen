import { useState } from "react";

export default function Sidebar({ courses, selectedCourse, setSelectedCourse, addCourse }) {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;

    addCourse(input);
    setInput("");
    setShowInput(false);
  };

  return (
    <div style={{ width: "250px", borderRight: "1px solid #ddd", padding: "10px" }}>
      <h3>Courses</h3>

      {!showInput ? (
        <button onClick={() => setShowInput(true)}>
          + New Course
        </button>
      ) : (
        <div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Course name"
          />
          <button onClick={handleAdd}>Add</button>
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            style={{
              padding: "8px",
              cursor: "pointer",
              background: selectedCourse?.id === course.id ? "#eee" : "transparent"
            }}
          >
            {course.title}
          </div>
        ))}
      </div>
    </div>
  );
}