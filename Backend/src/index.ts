import { Hono } from 'hono';
// since your using edge servers don't forget to use edge servers
import { PrismaClient } from './generated/prisma/edge';
// if your using primsa accelerate --> connection pooling
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)


app.use("/api/v1/blog/*", async(c, next) =>{
  
  const header = c.req.header("Authorization")

  if (!header) {
    c.status(403)
    return c.json({error:"Unauthorized"})
  }

  const token = header?.split(" ")[1]

  const verification = await verify(token, c.env.JWT_SECRET);
   
  if (verification) {
    return c.json({Message:"Verified"})
    next()
  }


})







export default app
