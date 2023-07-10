import fs, { readFileSync } from "fs";
import { todo } from "node:test";
import { v4 as uuid } from "uuid";
//const fs = require("fs") CommonJS;
const DB_FILE_PATH = "./core/db";

//console.log("[CRUD]");

type UUID = string;

interface ToDo {
    id: UUID;
    date: string;
    content: string;
    done: boolean;
}

function create(content: string): ToDo {
    const toDo: ToDo = {
        id: uuid(),
        date: new Date().toISOString(), //transformar a data em string, o Date retorna um objeto tipo data
        content: content,
        done: false,
    };
    const toDos: Array<ToDo> = [...read(), toDo];

    // salvar o content no sistema                      //null => nenhum find/replace 2 => espaçamento
    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                toDos,
                dogs: [],
            },
            null,
            2
        )
    ); // converter o toDo em string
    return toDo;
}

export function read(): Array<ToDo> {
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8"); // O utf foi inserido para que seja lido apenas quando o conteúdo do DB estiver formatado
    const db = JSON.parse(dbString || "{}"); // convertendo o banco de dados pra qualquer forma de dados

    if (!db.toDos) {
        // Fail fast validation
        return [];
    }

    return db.toDos;
}

function update(id: UUID, partialToDo: Partial<ToDo>): ToDo {
    let updatedToDo;
    const toDos = read();
    toDos.forEach((currentToDo) => {
        const isToUpdate = currentToDo.id === id;
        if (isToUpdate) {
            updatedToDo = Object.assign(currentToDo, partialToDo);
        }
    });

    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                toDos,
            },
            null,
            2
        )
    );

    if (!updatedToDo) {
        throw new Error("Please, provide another ID!");
    }

    return updatedToDo;
}

function updateContentById(id: UUID, content: string): ToDo {
    return update(id, {
        content,
    });
}

function deleteById(id: UUID) {
    const toDos = read();

    const toDosWthoutOne = toDos.filter((toDo) => {
        if (toDo.id === id) {
            return false;
        }
        return true;
    });

    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                toDos: toDosWthoutOne,
            },
            null,
            2
        )
    );
}

function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, "");
}

// [SIMULATION]
// CLEAR_DB();
// create("primeira TO DO");
// const secondToDo = create("segunda To Do");
// deleteById(secondToDo.id);
// const thirdToDo = create("terceira TO DO");
// updateContentById(thirdToDo.id, "Atualizada!");
// const toDos = read();
// console.log(toDos);
// console.log(toDos.length);
