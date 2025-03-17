import { forwardRef, useEffect, useReducer, useRef, useState, InputHTMLAttributes, useImperativeHandle, useMemo } from 'react'
import './App.css'
import NestedComments from './pages/nested-comments/NestedComments'
import Parent from './pages/truncate-pagination/Parent'
import { useEffectPoly } from './hooks/useEffectPoly'
import { FileOrFolder, FolderType } from './pages/file-manager/types'
import FileManager from './pages/file-manager/FileManager'
import InfiniteScrollList from './pages/Infinite-scroll/InfiniteScrollList'
import Stopwatch from './pages/stopwatch/Stopwatch'
import AutocompleteParent from './pages/autocomplete/AutocompleteParent'
import ProgressBar from './pages/progress-bar/Progressbar'
import CarouselParent from './pages/carousel/CarouselParent'
import { useMemoPoly } from './hooks/useMemoPoly'



function App() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const [progress, setProgress] = useState(0)


  // useEffectPoly(() => {
  //   console.log('count', count);
  //   return () => {
  //     console.log('clean up');
  //   }
  // })


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

  // useEffect(() => {
  //   console.log('count', count);
  //   return () => {
  //     console.log('clean up');
  //   }
  // })

  // useEffect(()=>{
  // console.log('calc changed');
  // },[calc])

  // useEffect(()=>{
  //   console.log('count',count);
  // },[count])

  //   useEffect(() => {
  //   console.log('count', count);
  //   return () => {
  //     console.log('clean up');
  //   }
  // }, [count])

  // useEffect(()=>{
  //   console.log('initial count render',count);
  // },[])


  // useEffect(() => { 
  //   console.log(progress)
  //   const id = setInterval(() => {
  //     setProgress((prev) => prev + 1)
  //   }, 100);

  //   return () => clearInterval(id);
  // }, [])


  // const sqrt = useMemo(() => {
  //   console.log('calculating...')
  //   return count * count;
  // }, [count])

  // const sqrt2 = useMemoPoly(() => {
  //   console.log('calculating 2...')
  //   return count * count;
  // }, [count])


  return <div className="App">
    <CarouselParent />
    <Stopwatch />
    <NestedComments />
    <Parent />
    <ProgressBar value={progress} max={100} color="success" size="large" striped animated showLabel />
    {/* <button onClick={() => setCount2(count2 + 1)}>inc2</button>
    <button onClick={() => setCount(count + 1)}>inc</button>
    <button onClick={() => setCount(count - 1)}>dec</button>
    <div>sqrt : {sqrt}</div>
    <div>sqrt : {sqrt2}</div> */}
    <AutocompleteParent />
    <InfiniteScrollList />
  </div>

}

export default App
