import { useState } from "react";
import React from 'react'
import firebase from "./firebaseConnection";
import "./style.css"
function App() {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  async function handleAdd() {
    
    await firebase.firestore().collection('posts')
    .doc('12345')
    .set({
      titulo:titulo,
      autor:autor
    })
    .then(()=>{
      console.log('dados cadastrados com sucesso!');
    })
    .catch((error)=>{
      console.log('houve um erro.');
    })

  }

  return (
    <div className="App">
      <h1>ReachJS + Firebase ;-)</h1>
      <div className="container">
        <label>Titulo: </label>
        <textarea type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

        <label>autor: </label>
        <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
        <button onClick={handleAdd}>Cadastrar</button>
      </div>
    </div>
  );
}

export default App;
