import React, { useState, useEffect } from "react";

function ExampleComponent() {
  // Define state variables using the useState hook
  const [count, setCount] = useState(0);

  // useEffect hook with no dependencies

  // useEffect hook with dependencies
  useEffect(() => {
    // This code runs after every render when `count` changes
    console.log("Count changed:", count);
  }, [count]); // Dependency array

  // Event handler function
  const incrementCount = () => {
    setCount(count + 1);
  };
  const [count1, setCount1] = useState(0);

  useEffect(() => {
    // Function to increment count1 every 2 seconds
    const intervalId = setInterval(() => {
      setCount1((prevCount1) => prevCount1 + 1);
    }, 2000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // JSX to rend∂er the component
  return (
    <div>
      <p>Count: {count1}</p>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
}

export default ExampleComponent;
