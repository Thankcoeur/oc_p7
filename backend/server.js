const {sequelize} = require("./models");
const app = require('./app');
const fs = require('fs')
const  path = require('path')
const http = require('http');


 

const optional = {
key : fs.readFileSync(path.join(__dirname, 'cert','key.pem')),
cert : fs.readFileSync(path.join(__dirname, 'cert','cert.pem'))



}



    http.createServer(app).listen(3000,  async () => {
        await sequelize.sync()

    });