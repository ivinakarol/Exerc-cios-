import {useState, useEffect} from 'react';


function App() {
  
  const [listName, setListName] = useState([]);
  const [name, setName] = useState("");


  const loadName = () => {
    fetch("http://localhost:3001/name")
    .then((response) => {
        response.json().then((list) => {
          setListName(list);
        });
    });
  };
   
  const sortearName = () => {
    const max = listName.length;
    const randomIndex = Math.floor(Math.random() * max);
    setName(listName[randomIndex]);
  }

  useEffect(() => {
    loadName();
  }, []);
  return (
    <div>
      <span>O nome da sorte é: {name}</span>
      <ul>
        {listName.map((name, index) =>{
          return <li key={index}>{name}</li>
        })}
      </ul>
        <button onClick={loadName}>Carregar Nomes</button>
        <button onClick={sortearName}>Sortear Nomes</button>
    </div>
  )

}

export default App;
