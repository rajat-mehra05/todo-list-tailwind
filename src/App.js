import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
      e.preventDefault();

      //edit todo item

      if(editId) {
       const editedTodo =  allTodos.find((item) => item.id === editId); 
        /* console.log(editedTodo); */

       const updatedTodos = allTodos.map((item) =>
          item.id === editedTodo.id
          ? ( item = {id: item.id, input})
          : {id: item.id, input: item.input}
       ) 

        setAllTodos([...updatedTodos]);
        setEditId(0);
        setInput("");
        return;

      }

      if(!input) alert("Please input field me kuch toh likh !!!")
        else {
          setAllTodos([...allTodos, {id: `${input}-${Date.now()}`, input}])
          setInput("");
          inputRef.current.focus();
        }
  }

  const handleEdit = (id) => {
      const editTodo = allTodos.find((selected) => selected.id === id);
      setInput([editTodo.input]);
      inputRef.current.focus();
      setEditId(id);

  }

  const handleDelete = (id) => {
    const delTodos =  allTodos.filter((t) => t.id !== id);
      setAllTodos([...delTodos])
  }

  return (
    <>
    <div className='flex items-center justify-center mt-8 p-8'>
    <div>
    <h1 className='text-3xl text-slate-900 my-4'> Todo-List  </h1>
    <hr className='border-2 border-red-500 mb-4' />
      <form className='flex gap-4' onSubmit={handleSubmit}>
        <input
        ref={inputRef}
        className='border-black border-2 rounded p-2' 
        type="text" placeholder='Enter your task...' value={input} onChange={(e) => setInput(e.target.value)} />
        <button className='bg-gray-600 p-2 text-white'> 
          { editId ? "Save Item" : "Add Item"}
         </button>
      </form>
      
      <ul className='mt-8 flex gap-8 flex-col'>
        {
          allTodos.map((todo) => (
            <li key={todo.id} className='flex gap-4 border-2 border-slate-600 p-4'> 
            <span className='bg-gray-300 text-black p-4'> {todo.input} </span>
            <button onClick={()=> handleEdit(todo.id)} className='bg-gray-600 p-2 text-white'> Edit</button>  
            <button onClick={()=> handleDelete(todo.id)} className='bg-gray-600 p-2 text-white'> Delete</button>  
             </li>
          ))
        }
      </ul>
    </div>
    </div>
    </>
  );
}

export default App;
