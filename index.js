const express = require ('express')
const bodyParser = require('body-parser')

const userRouter = require('./routes/UserRoutes')

const app = express ()
app.use(express.urlencoded({extended:false}))
const port = 3000


userRouter(app)

app.get("/", (req, res) => res.send ("ola mundo pelo express"))
app.listen(port, {} == console.log("api rodando na porta 3000"))
