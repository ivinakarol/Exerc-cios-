
import './App.css';
import {useState} from "react";

function App() {

  const nomes = ["João", "Maria", "Joaquim", "Joana"];

  const [nome, setNome] = useState("");

  function gerarNome() {
      const random = Math.floor(Math.random() * nomes.length);
      setNome(nomes[random]);
   }

  return (
    <div className="App">
     <button onClick={() => gerarNome()}>Gerar Nome</button>
      <br/>
      <span>Nome: {nome}</span>
      
  
    </div>
  );
}

export default App;
