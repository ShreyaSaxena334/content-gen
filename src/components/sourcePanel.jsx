export default function SourcesPanel({ selectedCourse, sources, addSource }) {

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
      addSource(selectedCourse.id, {
        id: Date.now().toString() + file.name,
        name: file.name,
        file: file
      });
    });
  };

  if (!selectedCourse) {
    return (
      <div style={{ width: "250px", padding: "10px", borderLeft: "1px solid #ddd" }}>
        <h3>Sources</h3>
        <p>Select a course</p>
      </div>
    );
  }

  return (
    <div style={{ width: "250px", padding: "10px", borderLeft: "1px solid #ddd" }}>
      <h3>Sources</h3>

      <input
        type="file"
        multiple
        onChange={handleFileUpload}
      />

      <div style={{ marginTop: "10px" }}>
        {sources.map((s) => (
          <div key={s.id} style={{ padding: "5px 0" }}>
            {s.name}
          </div>
        ))}
      </div>
    </div>
  );
}