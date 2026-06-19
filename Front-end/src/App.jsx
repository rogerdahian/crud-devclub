import "./App.css";
import { useState, useEffect } from "react";
import UserCard from "./components/UserCard";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function buscarUsuarios() {
      const resposta = await axios.get("http://localhost:3000/usuarios");
      const normalized = resposta.data.map((u) => ({
        ...u,
        name: u.nome,
        age: u.idade,
      }));
      setUsers(normalized);
    }

    buscarUsuarios();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    await axios.post("http://localhost:3000/usuarios", {
      // send the payload in the shape the API expects
      nome: name,
      email: email,
      idade: age,
    });
    async function buscarUsuarios() {
      const resposta = await axios.get("http://localhost:3000/usuarios");
      const normalized = resposta.data.map((u) => ({
        ...u,
        name: u.nome,
        age: u.idade,
      }));
      setUsers(normalized);
    }

    buscarUsuarios();

    setName("");
    setEmail("");
    setAge("");
  }

  async function deleteUser(id) {
    await axios.delete(`http://localhost:3000/usuarios/${id}`);
    const newUsers = users.filter((user) => user._id !== id);
    setUsers(newUsers);
  }

  return (
    <div className="app">
      <h1>Cadrastro de usuários</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          placeholder="Idade"
          type="number"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />

        <button type="submit">Cadrastrar</button>
      </form>

      <div className="user-list">
        {users.map((user) => (
          <UserCard key={user._id} user={user} deleteUser={deleteUser} />
        ))}
      </div>
    </div>
  );
}

export default App;
