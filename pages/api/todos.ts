import { NextApiRequest, NextApiResponse } from "next";
import { toDoController } from "@server/controller/todo"

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    // eslint-disable-next-line no-console
    console.log(request.method);
    if (request.method === "GET") {
        toDoController.get(request, response);
        return;
    }

    response.status(405).json({
        message: "Method not allowed",
    });
}
