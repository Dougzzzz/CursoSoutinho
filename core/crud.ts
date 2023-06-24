import fs, { readFileSync } from "fs" 
//const fs = require("fs") CommonJS;
const DB_FILE_PATH = "./core/db"

console.log("[CRUD]");


interface ToDo {
  date: string;
  content:string;
  done: boolean;
}

function create(content: string) {
  const toDo: ToDo = {
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
  return content;
}

function read(): Array<ToDo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");// O utf foi inserido para que seja lido apenas quando o conteúdo do DB estiver formatado
  const db = JSON.parse(dbString || "{}"); // convertendo o banco de dados pra qualquer forma de dados
  
  if(!db.toDos){ // Fail fast validation
    return [];

  }

  return db.toDos;

}
function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH,"");
}
// [SIMULATION]
CLEAR_DB()
create("primeira TO DO");
create("segunda TO DO");
console.log(read());