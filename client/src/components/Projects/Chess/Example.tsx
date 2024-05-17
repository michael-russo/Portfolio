import React, { useState, useEffect } from "react";

function ExampleComponent() {
  // Define state variables using the useState hook
  const [count, setCount] = useState(0);

  // useEffect hook with no dependencies
  useEffect(() => {
    // This code runs after every render
    console.log("Component rendered");
  });

  // useEffect hook with dependencies
  useEffect(() => {
    // This code runs after every render when `count` changes
    console.log("Count changed:", count);
  }, [count]); // Dependency array

  // Event handler function
  const incrementCount = () => {
    setCount(count + 1);
  };

  // JSX to render the component
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
}

export default ExampleComponent;
