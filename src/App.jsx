import { useState } from "react";

export default function App() {
  const [widget, setWidget] = useState("Button");

  console.log("App rendered");

  return (
    <div className="container">
      <label>Select Widget</label>
      <select value={widget} onChange={(e) => setWidget(e.target.value)}>
        <option>Button</option>
        <option>Image</option>
        <option>Text</option>
      </select>
      <p>Selected: {widget}</p>
    </div>
  );
}
