import { useState, useEffect } from "react";
import React from 'react'
import firebase from "./firebaseConnection";
import "./style.css"
function App() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cargo, setCargo] = useState('');
  const [nome, setNome] = useState('');

  async function novoUsuario() {
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then(async (value) => {

        await firebase.firestore().collection('users')
          .doc(value.user.uid)
          .set({
            nome: nome,
            cargo: cargo,
            status: true
          })
          .then(() => {
            setNome('');
            setCargo('');
            setEmail('');
            setSenha('');
          })

        console.log(value);
        console.log('Usuário cadastrado com sucesso!');
      }).catch((e) => {
        console.log('Houve um erro: ', e);
      })
  }

  async function logout() {
    await firebase.auth().signOut();
  }

  return (
    <div className="App">
      <h1>ReachJS + Firebase ;-)</h1>
      <div className="container">
        <label>Nome</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        <br />
        <label>Cargo</label>
        <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} />
        <br />
        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Senha</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logout}>Sair da conta</button>
        <br /><br />
      </div>
    </div>
  );
}

export default App;
