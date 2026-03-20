import { useState } from "react";
import Sidebar from "../components/sidebar";
import ChatWindow from "../components/chatWindow";
import SourcesPanel from "../components/sourcePanel";

export default function Dashboard() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [courses, setCourses] = useState([
    { id: "1", title: "AI Basics" },
    { id: "2", title: "Cloud Computing" }
  ]);

  const [courseSources, setCourseSources] = useState({});

  const addCourse = (title) => {
    const newCourse = {
      id: Date.now().toString(),
      title
    };

    setCourses((prev) => [...prev, newCourse]);
    setSelectedCourse(newCourse);
  };

  const addSourceToCourse = (courseId, source) => {
    setCourseSources((prev) => ({
      ...prev,
      [courseId]: [...(prev[courseId] || []), source]
    }));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <Sidebar 
        courses={courses}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        addCourse={addCourse}
      />

      <ChatWindow selectedCourse={selectedCourse} />

      <SourcesPanel 
        selectedCourse={selectedCourse}
        sources={selectedCourse ? courseSources[selectedCourse.id] || [] : []}
        addSource={addSourceToCourse}
      />

    </div>
  );
}