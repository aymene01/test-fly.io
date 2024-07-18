import { IncomingMessage, ServerResponse } from "http";

export function handler(req: IncomingMessage, res: ServerResponse){
    const { method, url } = req
    console.log({ method, url })
    res.end('Hello World \n')
}