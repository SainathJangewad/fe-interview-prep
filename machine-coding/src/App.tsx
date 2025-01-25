import { useEffect, useState } from 'react'
import './App.css'
import NestedComments from './pages/nested-comments/NestedComments'
import Parent from './pages/truncate-pagination/Parent'
import { useEffectPoly } from './hooks/useEffectPoly'

function App() {
  const [count, setCount] = useState(0)


  const calc = () => {
    console.log('calc');
  }




  useEffectPoly(() => {
    console.log('count', count);
    return () => {
      console.log('clean up');
    }
  })


  // useEffectPoly(() => {
  //   console.log('count', count);
  //   return () => {
  //     console.log('clean up');
  //   }
  // }, [count])

  // useEffectPoly(() => {
  //   console.log('count', count);
  //   return () => {
  //     console.log('clean up');
  //   }
  // }, [ ])

  // --------------------------------------

  // useEffect(()=>{
  // console.log('calc changed');
  // },[calc])

  // useEffect(()=>{
  //   console.log('count',count);
  // },[count])

  // useEffect(()=>{
  //   console.log('initial count render',count);
  // },[])

  return (
    <div>
      <div className="App">
        <NestedComments />
        <Parent />

        <button onClick={() => setCount(count + 1)}>inc</button>

      </div>
    </div>

  )
}

export default App
