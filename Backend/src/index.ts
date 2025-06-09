import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

app.use("/api/v1/blog/*", async(c, next) =>{
  
  const header = await c.req.header("Authorization")

  if (!header) {
    c.status(403)
    return c.json({error:"Unauthorized"})
  }

  const token = header?.split(" ")[1]

  const verification = await verify(token, c.env.JWT_SECRET);
   


})

app.post('/api/v1/signup', async (c) => {
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
    
    const jwt = await sign({id: UserCreating.id}, c.env.JWT_SECRET, 'HS256')
    return c.json({jwt})
  } catch (e) {
    c.status(403);
    return c.json({e:"Error while signing up "})
  }
  


})

app.post('/api/v1/login', async (c) => {
 
  console.log("Login Route Started:")

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())


  const body = await c.req.json();

  const LoginUser = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  })

  if (!LoginUser) {
     c.status(403);
    return c.json({Error: "User not found"})
  }

})


app.post('/api/v1/blog', (c) => {
  return c.json({
    message: "Posting Blog Route: "
  })
})

app.put("/api/v1/blog", (c) => {
  return c.text("")

})

app.get("/api/v1/blog/:id", (c) => {
  return c.text("")

})



app.get("/api/v1/blog/bulk", (c) => {

  return c.text("")
})

app.get("/", (c) => {
  return c.text("hello")
})

export default app
