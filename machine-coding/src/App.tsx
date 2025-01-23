import { useState } from 'react'
import './App.css'
import NestedComments from './pages/nested-comments/NestedComments'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div className="App">
        <NestedComments />
      </div>
    </div>

  )
}

export default App
