import fs, { readFileSync } from "fs" 
import { v4 as uuid } from 'uuid';
//const fs = require("fs") CommonJS;
const DB_FILE_PATH = "./core/db"

console.log("[CRUD]");


interface ToDo {
  id: string;
  date: string;
  content:string;
  done: boolean;
}

function create(content: string): ToDo {
  const toDo: ToDo = {
    id: uuid(),
    date: new Date().toISOString(), //transformar a data em string, o Date retorna um objeto tipo data
    content: content,
    done: false,

  };
  const toDos: Array<ToDo> = [
    ...read(),
    toDo,
  ];
  
  // salvar o content no sistema                      //null => nenhum find/replace 2 => espaçamento
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    toDos,
    dogs: [],
    }, null,
     2));// converter o toDo em string
  return toDo;
}

function read(): Array<ToDo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");// O utf foi inserido para que seja lido apenas quando o conteúdo do DB estiver formatado
  const db = JSON.parse(dbString || "{}"); // convertendo o banco de dados pra qualquer forma de dados
  
  if(!db.toDos){ // Fail fast validation
    return [];

  }

  return db.toDos;

}

function update(id: string, partialToDo: Partial<ToDo>){
  let updatedToDo;
  const toDos = read();
  toDos.forEach((currentToDo)=> {
    const isToUpdate = currentToDo.id === id;
      if(isToUpdate) {
        updatedToDo = Object.assign(currentToDo, partialToDo);
      }
  });

  fs.writeFileSync(DB_FILE_PATH,JSON.stringify({
    toDos,
  }, null, 2))

  if(!updatedToDo){
    throw new Error("Please, provide another ID!")
  }
  
}

function updateContentById(id: string, content: string) {
  return update(id, {
    content,
  });
}



function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH,"");
}

// [SIMULATION]
CLEAR_DB()
create("primeira TO DO");
create("primeira TO DO");
const terceiraToDo = create("segunda TO DO");
// update (terceiraToDo.id, {
//   content:"Atualizada"
// })
updateContentById(terceiraToDo.id, "Atualizada!")
console.log(read());