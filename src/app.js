const express = require('express');
const routers = require('./routes');
const { sequelize } = require('./models');
const app = express();

app.use(express.json());
app.use('/', routers);

app.listen(3000, () => {
    console.log('Servidor Conectado');
});

