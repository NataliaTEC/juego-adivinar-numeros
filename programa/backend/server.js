//se importan lo modulos necesarios 
const express = require('express');//necesario para crear el servidor y manejar las rutas
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

//configuracion del servidor
const app = express();
const PORT = 3000; //puerto donde se ejecuta el servidor

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// --- inicio del servidor ---
app.listen(PORT, () => {
  console.log(`Servidor backend de adivinar numeros corriendo en http://localhost:${PORT}`);
});