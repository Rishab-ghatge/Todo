import { useState,useEffect,useRef } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



function App() {

  const addref = useRef()

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFininshed] = useState(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])
  
  const saveToLS = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFininshed(!showFinished)
  }
  
  
  const handleAdd = ()=>{
    settodos([...todos,{id:uuidv4(),todo,iscompleted: false}])
    settodo("")
    saveToLS()
    addref.current.innerText = "Add Todo"

  }

  const handleEdit = (e,id)=>{
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id; 
    })
    settodos(newTodos)
    saveToLS()
    addref.current.innerText = "Save"

  }

  const handleDelete = (e, id)=>{
    if(confirm("Confirm Delete")){
    let newTodos = todos.filter(item=>{
      return item.id!==id; 
    })
    settodos(newTodos)
    saveToLS()
   }
  }

  const handleChange =(e)=>{
    settodo(e.target.value)
  }

  const handleCheckBox = (e)=>{
    let id  = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].iscompleted = !newTodos[index].iscompleted 
    settodos(newTodos)
    saveToLS() 
  }

  return (
    <>
    <Navbar/>
     <div className="container mx-auto my-6 border bg-violet-100 p-4 rounded-xl min-h-[80vh] md:w-1/2 w-[90vw]">
      <h1 className='text-center font-bold text-2xl md:text-4xl'>iTask - Manage your Todos at One Place</h1>
         <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full p-2 rounded-md'/>
          <button ref={addref} onClick={handleAdd} disabled={todo.length<=2} className=' bg-purple-400 text-white rounded-md px-2 py-2 hover:opacity-90 disabled:hidden'>Add Todo</button>
         </div>
         <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='mr-4'/>Show Finished
         <div className='h-[1px] bg-black opacity-20 my-2'></div>
         <h2 className='text-xl font-bold'>Your Todos</h2>
         <div className="todos">
          {todos.length ===0 && <div className='my-6'>No Todos To Display</div>}
          {todos.map(item=>{
            return (showFinished || !item.iscompleted) && <div key={item.id} className="todo flex w-full my-4 justify-between">
            <div className='flex items-center gap-5'>
            <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.iscompleted}  id="" />
            <div className={item.iscompleted?"line-through":""}>{item.todo }</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className=' bg-purple-400 text-white rounded-md px-2 py-2 hover:opacity-90 mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className=' bg-purple-400 text-white rounded-md px-2 py-2 hover:opacity-90 mx-1'><MdDeleteForever /></button>
            </div>
          </div>
          })}
         </div>
     </div>
    </>
  )
}

export default App
