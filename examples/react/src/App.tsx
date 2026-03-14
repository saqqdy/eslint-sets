import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>React + ESLint Sets Example</h1>
      <p>
        Count:
        {count}
      </p>
      <button type="button" onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default App
