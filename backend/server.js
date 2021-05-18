const {sequelize} = require("./models");
const app = require('./app');

const http = require('http');





    http.createServer(app).listen(3000,  async () => {
        await sequelize.sync()

    });