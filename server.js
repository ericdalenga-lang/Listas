
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));
// ---- LISTA 1: artistas (cada um tem um id) ----
const artistas = [
  {id: 1, nome: "2Zdinizz", pais: "Brasil" },
   {id: 2, nome: "Link do zap", pais: "Brasil" },
    {id: 3, nome: "Sotam", pais: "Brasil" },
     {id: 4, nome: "CBJ", pais: "Brasil" },
];
const musicas = [
  { id: 1, titulo: "Bandido não, malandro", artistaId: 1, duracao: 211},
  { id: 2, titulo: "Erro favorito", artistaId: 1, duracao: 179},
  { id: 3, titulo: "Eu posso ser Deus", artistaId: 2, duracao: 139},
  { id: 4, titulo: "Dando um jeito", artistaId: 2, duracao: 137},
  { id: 5, titulo: "Foi assim", artistaId: 3, duracao: 147},
  { id: 6, titulo: "Dona do meu pensamento", artistaId: 4, duracao: 240},
];

app.get("/artistas", (req, res) => {
  res.status(200).json(artistas);
});

app.get("/musicas", (req, res) =>{
  const resultado = musicas.map((m) => {
    const artista = artistas.find((a) => a.id === m.artistaId);
    return{
      titulo: m.titulo,
      duracao: m.duracao,
      artistas: artista ? artista.nome : "Desconhecido",
      pais: artista ? artista.pais : "-",
    };
  });
  res.status(200).json(resultado);
});

app.get("/artistas/:id/musicas", (req, res) => {
  const id = Number(req.params.id);
  const doArtista = musicas.filter((m) => m.artistaId === id)
  res.status(200).json(doArtista);
});

app.listen(PORT, () => {
  console.log(`Playlist no ar:http://localhost:${PORT}`);
});
