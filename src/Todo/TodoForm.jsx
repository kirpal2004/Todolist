import {useState} from "react";

export const TodoForm = ({onAddTodo}) => {
       
       const[inputValue,setInputValue]=useState({});  //for storing data in object form 
       
        const handleInputChange = (value)=>{
              setInputValue({id:value, content:value, checked:false});
       }
       
       const handelFormSubmit = (event)=>
       {
              event.preventDefault();
              onAddTodo(inputValue);
              setInputValue({id:"", content:"", checked:false}); //third validation
       };
            
  return (
       <section className="form" >
                            <form onSubmit={handelFormSubmit}>
                                   <div>
                                          <input type="text"
                                           className="todo-input"
                                            autoComplete="off" 
                                            value={inputValue.content} 
                                            onChange={(event)=>handleInputChange(event.target.value)}/>
                                   </div>
                                   <div>
                                          <button type="submit" className="todo-btn">Add Task</button>
                                   </div>
                            </form>
                     </section>
  );
};
