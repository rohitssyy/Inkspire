import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
      }
}>()



blogRouter.post('/', (c) => {
    return c.json({
        message: "Posting Blog : "
    })
})

blogRouter.put("/", (c) => {
    return c.text("")

})


// this is you adding extra : all blog at once 
blogRouter.get("/bulk", (c) => {

    return c.text("")
})

blogRouter.get("/:id", (c) => {
    return c.text("")

  })