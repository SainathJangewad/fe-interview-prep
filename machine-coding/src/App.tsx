import { useEffect, useReducer, useState } from 'react'
import './App.css'
import NestedComments from './pages/nested-comments/NestedComments'
import Parent from './pages/truncate-pagination/Parent'
import { useEffectPoly } from './hooks/useEffectPoly'
import { FileOrFolder, FolderType } from './pages/file-manager/types'
import FileManager from './pages/file-manager/FileManager'
import InfiniteScrollList from './pages/Infinite-scroll/InfiniteScrollList'
import Stopwatch from './pages/stopwatch/Stopwatch'

// Initial state
const initialState: FolderType = {
  id: "root",
  name: "Root",
  type: "folder",
  children: [],
};

// Reducer function
function fileManagerReducer(
  state: FolderType,
  action: { type: string; payload: any }
): FolderType {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        children: [...state.children, action.payload],
      };
    case "RENAME_ITEM":
      return renameItem(state, action.payload.id, action.payload.newName);
    default:
      return state;
  }
}

// Helper function to rename an item
function renameItem(
  node: FileOrFolder,
  id: string,
  newName: string
): FileOrFolder {
  if (node.id === id) {
    return { ...node, name: newName };
  }
  if (node.type === "folder") {
    return {
      ...node,
      children: node.children.map((child) => renameItem(child, id, newName)),
    };
  }
  return node;
}

function App() {
  const [count, setCount] = useState(0)
  const [state, dispatch] = useReducer(fileManagerReducer, initialState);

  const calc = () => {
    console.log('calc');
  }




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



  return (
    <div>
      <div className="App">
        <Stopwatch />
   
        <NestedComments />
        <Parent />
        <button onClick={() => setCount(count + 1)}>inc</button>
        <FileManager data={state} dispatch={dispatch} />
        <InfiniteScrollList />

      </div>
    </div>

  )
}

export default App
