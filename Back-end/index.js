import express from "express";

import mongoose from "mongoose";
import dns from "dns";
import cors from "cors";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado ao banco de dados Mongo"))
  .catch((error) => console.log("Erro ao conectar ao Mongo: ", error));

const usuariosSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    idade: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const Usuario = mongoose.model("Usuarios", usuariosSchema);

app.get("/usuarios", async (req, res) => {
  const usuariosDoBanco = await Usuario.find();

  res.json(usuariosDoBanco);
});

app.post("/usuarios", async (req, res) => {
  const usuarioCriado = await Usuario.create(req.body);

  res.json(usuarioCriado);
});

app.delete("/usuarios/:id", async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Usuário deletado!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
