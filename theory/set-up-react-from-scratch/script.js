// --- Vanilla React Version (Without JSX) ---
/*
const { useState, createElement } = React;

// Counter Component
function CounterApp() {
  // Declare state variable 'count' with initial value 0
  const [count, setCount] = useState(0);

  // Function to increment the count
  const increment = () => {
    setCount(count + 1);
  };

  // Using React.createElement to create elements manually
  // React.createElement(type, props, ...children)
  // - 'type': The type of the HTML element or React component (e.g., 'div', 'h1')
  // - 'props': An object containing properties like attributes and event handlers (e.g., { onClick: increment })
  // - '...children': The children elements or text content to be nested inside the created element
  
  // In the 'props' parameter, we can pass:
  // 1. Event handlers (e.g., { onClick: increment }) - This defines how user interactions like clicks should be handled.
  // 2. Attributes like 'className', 'id', 'style' (e.g., { className: 'my-class', style: { color: 'red' } }) 
  //    - 'className' is used instead of 'class' in React to avoid conflicts with the 'class' keyword in JavaScript.
  //    - 'style' is an object where keys are CSS properties written in camelCase.
  // 3. Other React-specific properties like 'key' (for lists) and 'ref' (for accessing DOM nodes).
  return createElement(
    'div', // Type: div element
    null,  // Props: no additional properties
    createElement('h1', null, 'Counter App'), // Create <h1> with text 'Counter App'
    createElement('p', null, `Current Count: ${count}`), // Create <p> with dynamic count text
    createElement(
      'button', // Type: button element
      { onClick: increment }, // Props: onClick event handler to call increment function
      'Increment' // Children: text content inside the button
    )
  );
}

// Render the CounterApp component into the root div in the DOM
ReactDOM.render(
  createElement(CounterApp), // Create and render the CounterApp component
  document.getElementById('root') // Target element in the DOM with id 'root'
);
*/

// --- JSX Version ---
const { useState } = React;

function CounterApp() {
  // Declare state variable 'count' with initial value 0
  const [count, setCount] = useState(0);

  // Function to increment the count
  const increment = () => {
    setCount(count + 1);
  };

  // JSX Syntax: Creating elements similar to HTML but with React
  return (
    <div>
      <h1>Counter App</h1> {/* Heading displaying 'Counter App' */}
      <p>Current Count: {count}</p> {/* Paragraph showing the current count */}
      <button onClick={increment}>Increment</button> {/* Button to increment the count */}
    </div>
  );
}

// Render the CounterApp component into the root div in the DOM
ReactDOM.render(
  <CounterApp />, // Render CounterApp using JSX
  document.getElementById('root') // Target the 'root' div in the DOM
);
