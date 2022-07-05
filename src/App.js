import { useState, useEffect } from "react";
import React from 'react'
import firebase from "./firebaseConnection";
import "./style.css"
function App() {

  const [idPost, setIdPost] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      await firebase.firestore().collection('posts')
        .onSnapshot((doc) => {
          let meusPosts = [];

          doc.forEach((item) => {
            meusPosts.push({
              id: item.id,
              titulo: item.data().titulo,
              autor: item.data().autor
            })
          })
          setPosts(meusPosts);
        })
    }
    loadPosts();
  }, []);
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
        alert('Dados cadastrados com sucesso!');
      })
      .catch((error) => {
        alert('houve um erro.');
      })

  }

  async function editarPost() {
    await firebase.firestore().collection('posts')
      .doc(idPost).update(
        {
          titulo: titulo,
          autor: autor
        }
      ).then(() => {
        console.log('Dados atualizados com sucesso!');
        setIdPost('');
        setTitulo('');
        setAutor('');
      }).catch(() => {
        console.log('Houve um erro.');
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
      .then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })
        setPosts(lista);
      }).catch(() => {
        alert("erro ao recuperar posts");
      })
  }

  async function excluirPost(id) {
    await firebase.firestore().collection('posts')
    .doc(id).delete()
    .then(()=>{
      console.log('Post excluído com sucesso!');
    }).catch(()=>{
      console.log('Houve um erro.');
    })

  }

  return (
    <div className="App">
      <h1>ReachJS + Firebase ;-)</h1>
      <div className="container">
        <label>ID: </label>
        <input type="text" value={idPost} onChange={(e) => setIdPost(e.target.value)} />

        <label>Titulo: </label>
        <textarea type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

        <label>autor: </label>
        <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar Post</button>
        <button onClick={editarPost}>Editar Post</button>
        <br />
        <ul>
          {
            posts.map((post) => {
              return (
                <li key={post.id}>
                  <span>ID: {post.id}</span><br />
                  <span>Titulo: {post.titulo}</span><br />
                  <span>Autor: {post.autor}</span> <br />
                  <button onClick={() => excluirPost(post.id)}>Excluir Post</button>
                  <br />
                  <br />
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
