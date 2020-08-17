import { ServerRequest } from "https://deno.land/std@0.65.0/http/server.ts"

import data from "./data.ts"

const basicRes = (body: string, type: string) => ({
    body,
    headers: new Headers([
        ["content-type", `text/${type}; charset=utf-8`]
    ])
})

export default async (req: ServerRequest) => {
    const host = req.headers.get("x-vercel-deployment-url") || "http://localhost"
    const params = (new URL(req.url, host)).searchParams
    const id = params.get("id") || ""
    const prop = params.get("prop") as keyof typeof data
    let body;
    if (prop) {
        body = (data as any)[id][prop]
    } else {
        body = JSON.stringify((data as any)[id])
    }
	req.respond(basicRes(body, "json"))
}