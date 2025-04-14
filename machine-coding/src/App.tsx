import { forwardRef, useEffect, useReducer, useRef, useState, InputHTMLAttributes, useImperativeHandle, useMemo } from 'react'
import './App.scss'
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
import useWindowSize from './hooks/useWindowSize'
import useFetch from './hooks/useFetch'
import { useIntersectionObserver } from './hooks/useIntersectionObserver'
import PollWidgetParent from './pages/poll-widget/pollWidgetParent'
import { NotificationParent } from './pages/notification/NotificationParent'
import Counter from './redux/components/Counter'
import { useSelector } from 'react-redux'
import { RootState } from './redux/types'
import User from './redux/components/User'
import { useTheme } from './pages/dark-mode/ThemeContext'
import ThemeToggle from './pages/dark-mode/ThemeToggle'



function App() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const [progress, setProgress] = useState(0)
  // const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');
  const elRef = useRef(null);
  const options = useMemo(() => ({ root: null, rootMargin: '10px', threshold: 0.5 }), []);
  const intersectingEntry = useIntersectionObserver(elRef, options);

  const counter = useSelector((state: RootState) => state.counter.count);

  const { theme } = useTheme();


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

  // if (loading) return <div>loading..</div>
  // if (error) return <div>{error?.message}</div>

  // console.log('dataa', data);

  return <div className="App">

    {/* dark mode  */}
    <h1 className="home__title">Current Theme: {theme}</h1>
    <ThemeToggle />

    {/* <Counter /> */}
    {/* <User /> */}
    {
      counter
    }
    {/* <NotificationParent /> */}
    {/* <CarouselParent />
    <Stopwatch />
    <NestedComments />
    <Parent /> */}
    <ProgressBar value={progress} max={100} color="success" size="large" striped animated showLabel />
    {/* <button onClick={() => setCount2(count2 + 1)}>inc2</button>
    <button onClick={() => setCount(count + 1)}>inc</button>
    <button onClick={() => setCount(count - 1)}>dec</button> */}
    {/* <div>sqrt : {sqrt}</div>
    <div>sqrt : {sqrt2}</div> */}
    {/* <AutocompleteParent /> */}
    {/* <InfiniteScrollList /> */}

    <div ref={elRef} style={{ height: '200px', background: `${intersectingEntry?.isIntersecting ? 'green' : 'red'}` }}>
      element to observe
    </div>
    {/* <PollWidgetParent /> */}


  </div>

}

export default App
