const http = require('http');
const app = require('./app');
const { sequelize } = require('./models');

http.createServer(app).listen(3000, async () => {
    await sequelize.sync();
});
