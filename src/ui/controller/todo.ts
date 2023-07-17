async function get() {
    return fetch("/api/todos").then(async (ServerResponse) => {
        const toDosString = await ServerResponse.text();
        const toDosFromServer = JSON.parse(toDosString).toDos;
        return toDosFromServer;
    });
}

export const toDoController = {
    get,
};
