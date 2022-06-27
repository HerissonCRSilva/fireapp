import { useState } from "react";
import React from 'react'
import firebase from "./firebaseConnection";
import "./style.css"
function App() {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);

  async function handleAdd() {

    await firebase.firestore().collection('posts')
      // .doc('12345')
      // .set({
      //   titulo:titulo,
      //   autor:autor
      // })
      .add({
        titulo: titulo,
        autor: autor
      })
      .then(() => {
        alert('dados cadastrados com sucesso!');
      })
      .catch((error) => {
        alert('houve um erro.');
      })

  }

  async function buscarPost() {
    // await firebase.firestore().collection('posts')
    //   .doc('123')
    //   .get()
    //   .then((snapshot) => {
    //    setTitulo(snapshot.data().titulo);
    //    setAutor(snapshot.data().autor);
    //   })
    //   .catch((error) => {
    //     alert('houve um erro.');
    //   })

    await firebase.firestore().collection('posts')
    .get()
    .then((snapshot)=>{
      let lista = [];
      snapshot.forEach((doc)=>{
        lista.push({
          id:doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })
      setPosts(lista);
    }).catch(()=>{
      alert("erro ao recuperar posts");
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
        <button onClick={buscarPost}>Buscar Post</button>
<br/>
        <ul>
          {
            posts.map((post)=>{
              return(
                <li ley={post.id}>
                  <span>Titulo: {post.titulo}</span><br/>
                  <span>Autor: {post.autor}</span>
                  </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
