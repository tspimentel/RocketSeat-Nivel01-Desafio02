const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repositorie = {id:uuid(), title, url, techs, likes:0}
  
  repositories.push(repositorie);
  
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  const repositorie = {id, title, url, techs, likes:0}

  if(repositorieIndex < 0){
    return response.status(400).response.json({message: "Error: Repositorie not exists!"})
  }
  
  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
  
});

app.delete("/repositories/:id", (request, response) => {
  const { id }= request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if(repositorieIndex < 0){
    return response.status(400).response.json({message: "Error: Repositorie not exists!"})
  }

  repositories.splice(repositorieIndex,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id }= request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)
  
  if(repositorieIndex < 0){
    return response.status(400).response.json({message:"error repositorie dont exist!"});
  }

  const lastRepo = repositories[repositorieIndex];
  const repositorie = {
    ...lastRepo,
    likes:lastRepo.likes + 1
  }

  repositories[repositorieIndex] = repositorie;
  return response.json(repositorie);
});

module.exports = app;
