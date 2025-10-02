const express =require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const routes = require('./routes/routes')
const conn = require('./db/conn')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(routes)

app.get('/', (req,res)=> {
    res.send('API is running')
})

conn.sync().then(()=> {
    app.listen(port, 'localhost', ()=> {
        console.log(`Servidor rodando em http://localhost:${port}`)
    })
})