
const express = require('express');
const app = express();
const PORT = 3000;

//Middleware para parsear JSON
app.use(express.json())

//Ruta de inicio
app.get('/', (req, res)=> {
    res.send('¡Bienvenido a nuestro servidor Express!')
});

//Ruta con parámetros dinámicos
app.get('/greeting/:nombre', (req,res)=>{
    res.send(`Hola, ${req.params.nombre}!`)
});

//Ruta POST para recibir datos
app.post('/menssage', (req,res)=>{
    res.json({menssage: `Recibido: ${req.body.texto}`})
});

//Iniciar el servidor
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})