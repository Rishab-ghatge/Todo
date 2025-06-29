"use client"
import axios from "axios";
import React, { useEffect, useState,useRef } from "react";
import 'remixicon/fonts/remixicon.css'

const page = () => {
  const [title, settitle] = useState("")
  const [task, settask] = useState("")
  const [mainTask, setmainTask] = useState([])
  const isFirstLoad = useRef(true)

  const submitHandler = async(e)=>{
    e.preventDefault()
    setmainTask([...mainTask,{title,task}])
    settitle("")
    settask("")
    console.log(mainTask)
  }

  const editHandler = (i)=>{
    settitle(mainTask[i].title)
    settask(mainTask[i].task)
    deleteHandler(i)
  }
  const deleteHandler = (i)=>{
    var copyStack = [...mainTask]
    copyStack.splice(i,1)
    setmainTask(copyStack)
  }
  
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    localStorage.setItem("AllTask", JSON.stringify(mainTask))
  }, [mainTask])

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("AllTask"))
    if(savedData){
      setmainTask(savedData)
    }
  }, [])
  
  
  
  let renderTask = <div className="text-center text-xl text-gray-500 font-medium">🎉 No tasks left! Add something new.</div>

  if (mainTask.length>0) {
    {renderTask =  mainTask.map((t,i)=>{
      return <li key={i} className="list-none shadow-[4px_4px_12px_rgba(0,0,0,0.3)] rounded-lg py-2.5 px-4 bg-violet-100 text-black text-lg mb-7 flex justify-between items-center hover:scale-[1.01] transition-all duration-300">
        <div className="w-2/3">
          <h4 className="text-xl font-bold text-violet-900 italic md:text-2xl">"{t.title}"</h4>
          <p className="text-[16px] font-semibold text-violet-600">{t.task}</p>
        </div>
        <div className="w-1/3 flex justify-evenly">
          <button className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={()=>editHandler(i)}><i className="ri-edit-box-line text-xl"></i></button>
          <button className="cursor-pointer text-red-500 hover:text-red-700" onClick={()=>deleteHandler(i)}><i className="ri-delete-bin-line text-xl"></i></button>
        </div>
      </li>
    })}
  }

  return(
    <>
      {/* <h1 className="b text-violet-900 drop-shadow-md  text-5xl md:text-6xl font-extrabold text-center border-b-[1px] p-5">✨ Your Todo List</h1> */}
      <h1 className="animated-gradient text-white text-5xl md:text-6xl font-extrabold text-center rounded-xl shadow-xl p-6 mb-6 transition-shadow duration-500 hover:shadow-[0_0_20px_5px_rgba(139,92,246,0.7)]">
  ✨ Your Todo List
</h1>
      <form onSubmit={submitHandler} className="m-10 text-center">
        <input required value={title} onChange={(e)=>settitle(e.target.value)} className=" border-violet-300 rounded-xl outline-none focus:ring-2 focus:ring-violet-400 px-5 py-2.5 border  text-lg m-5" type="text" placeholder="Enter title"/>
        <input value={task} onChange={(e)=>settask(e.target.value)} className=" border-violet-300 rounded-xl outline-none focus:ring-2 focus:ring-violet-400 px-5 py-2.5 border  text-lg m-5" type="text" placeholder="Enter task"/>
        <button className="animated-gradient px-6 py-2.5  text-black font-bold text-lg rounded-lg m-5">Add</button>
      </form>
      <div className="hello m-auto shadow-[4px_4px_12px_rgba(0,0,0,0.5)] p-4 max-h-[50vh] w-[90%] md:max-w-[45vw] overflow-y-auto rounded-lg"> 
       {renderTask}
      </div>
    </>
  );
};

export default page;

