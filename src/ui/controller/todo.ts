import { toDoRepository } from "@ui/repository/todo";

interface ToDoControllerGetParams {
    page?: number;
}

async function get({ page }: ToDoControllerGetParams = {}) {
    return toDoRepository.get({
        page: page || 1,
        limit: 10,
    });
}

export const toDoController = {
    get,
};
