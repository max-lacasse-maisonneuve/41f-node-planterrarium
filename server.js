const http = require("http");
require("dotenv").config();

const server = http.createServer((request, response) => {
    response.writeHead(200);
    response.end("<h1>Hello</h1>");
});

//On assigne un port par défaut si aucune variable d'environnement n'est définie
const port = process.env.port || 5000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
