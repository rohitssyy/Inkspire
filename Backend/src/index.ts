import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/extension'

const app = new Hono()
const prisma = new PrismaClient()
 


app.post('/api/v1/signup', (c) => {

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
