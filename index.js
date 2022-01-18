const express = require("express")
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, '/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))



app.get('/',(req,res)=>{
    console.log('hello')
    res.sendFile(path.join(__dirname,'public','index.html'))
})
app.get('/systems',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','systems.html'))
})
app.get('/logic',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','logic.html'))
})
app.get('/upload',(req,res)=>{
    res.send('GET request to the homepage')

})
app.post('/upload', function (req, res) {
    res.send('POST request to the homepage')
})


app.listen(PORT,()=>console.log(`Server active and listening on port ${PORT}`))
// console.log('hello')