import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
      }
}>()

// ZOD Validation 
// Password Hashing
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    console.log("SignUp Route Started: ");

    const body = await c.req.json()
    console.log(body)
    try {

        const UserCreating = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            },
        })
        const jwt = await sign({ id: UserCreating.id, email: UserCreating.email }, c.env.JWT_SECRET, 'HS256')
        return c.json({ Message: "Signed Up", Token: jwt })

    } catch (e) {
        console.log(e)
        c.status(409);
        return c.json({ e: "Error while signing up, Might be a dublicate email" })
    }



})

userRouter.post('/login', async (c) => {
    console.log("Login Route Started:")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();

    try {
        const LoginUser = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        })

        if (!LoginUser) {
            c.status(403);
            return c.json({ Error: "User not found || FORBIDDEN" })
        }

        const jwt = await sign({ id: LoginUser.id, email: LoginUser.email }, c.env.JWT_SECRET, 'HS512')
        return c.json({ jwt })

    } catch (e) {
        console.log(e)
        c.status(411);
        return c.text("Something went wrong || Unauthorized")
    }
  })