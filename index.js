const express = require("express")
const path = require("path")
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, '/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))



app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})

app.listen(PORT,()=>console.log(`Server active and listening on port ${PORT}`))
