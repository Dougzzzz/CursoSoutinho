import { detectContentType } from "next/dist/server/image-optimizer";
import { todo } from "node:test";

interface toDoRepositoryGetParams {
    page: number;
    limit: number;
}
interface toDoRepositoryGetOutput {
    toDo: ToDo[];
    total: number;
    pages: number;
}

function get({
    page,
    limit,
}: toDoRepositoryGetParams): Promise<toDoRepositoryGetOutput> {
    return fetch("/api/todos").then(async (ServerResponse) => {
        const toDosString = await ServerResponse.text();
        const toDosFromServer = parseToDosFromServer(
            JSON.parse(toDosString)
        ).toDos;

        const ALL_TODOS = toDosFromServer;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedToDos = ALL_TODOS.slice(startIndex, endIndex);
        const totalPages = Math.ceil(ALL_TODOS.length / limit);
        return {
            toDos: paginatedToDos,
            total: ALL_TODOS.length,
            pages: totalPages,
        };
    });
}

export const toDoRepository = {
    get,
};

//model/schema
interface ToDo {
    id: string;
    content: string;
    date: Date;
    done: boolean;
}

function parseToDosFromServer(responseBody: unknown): { toDos: Array<ToDo> } {
    if (
        responseBody !== null &&
        typeof responseBody === "object" &&
        "toDos" in responseBody &&
        Array.isArray(responseBody.toDos)
    ) {
        return {
            toDos: responseBody.toDos.map((toDo: unknown) => {
                if (toDo == null && typeof toDo !== "object") {
                    throw new Error("Invalid toDo from API");
                }

                const { id, content, done, date } = toDo as {
                    id: string;
                    content: string;
                    date: string;
                    done: string;
                };

                return {
                    id,
                    content,
                    done: String(done).toLowerCase() === "true",
                    date: new Date(date),
                };
            }),
        };
    }

    return {
        toDos: [],
    };
}
