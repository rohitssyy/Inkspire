import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const app = new Hono<{
  Bindings: {
    DATABASE_URL:string
  }
}>()


app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  

  const body = await c.req.json()

  await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name
      },
    })
   
  
  
  return c.json({
    message: "Signup Route: "
  })

})

app.post('/api/v1/login', (c) => {
  return c.json({
    message: "Login Route: "
  })
})


app.post('/api/v1/blog', (c) => {
  return c.json({
    message: "Posting Blog Route: "
  })
})

app.put("/api/v1/blog", (c) => {

})

app.get("/api/v1/blog/:id", (c) => {

})



app.get("/api/v1/blog/bulk", (c) => {

  return c.text("")
})

app.get("/", (c) => {
  return c.text("hello")
})

export default app
