import './App.css';
import {useEffect, useState} from 'react';

function request(url, options){
  url ='http://localhost:3001';
  return fetch(url, options);
}


function App() {
  
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTodos = () => {
    fetch('http://localhost:3001/todo').then((response) => {
      response.json().then((todos) => {
        setTodoList(todos);
      });
    });
  };

  const deleteTodo = (id) => {
    request('/todo/' + id, {
      method: 'DELETE' 
    }).then(() => {
       setTodoList(todoList.filter((todo) => {
        return todo.id != id;
       }));
        console.log("Todo foi deletado");
    });
  };

  const createTodo = () => {
    if(title == "" || description == ""){
      return
    }
    request('/todo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        categoryId: 3
      }) 
    }).then(() => {
       loadTodos()
       });
       setDescription('');
       setTitle('');
       console.log("carregou");
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="App">
      <ul className="todo-list">
        {todoList.map((todo) => {
          return <li key={todo.id}>
             <button onClick={() => deleteTodo(todo.id)}>X</button>
             <strong>{todo.title}</strong>
              <br/>
             <span>{todo.desciption}</span>
              </li>;
         })}
      </ul>
    <div>
      <label>
        Titulo
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
        </label>
        <label>
          Description
    <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}></input>
    </label>
    </div>
    <button onClick={createTodo}>CREATE NEW TODO</button>
    </div>
    );
} 
export default App;
