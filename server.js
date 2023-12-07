const http = require("http");
const Logger = require("./classes/Logger.js");

//Initialisation d'un fichier de variables d'environnement
require("dotenv").config();

//Ajout d'un fichier de log
const logger = new Logger();

//Création d'un serveur
const server = http.createServer((request, response) => {
    response.writeHead(200);
    response.end("<h1>Hello</h1>");
});

//On assigne un port par défaut si aucune variable d'environnement n'est définie
const port = process.env.port || 5000;

// Démarrage du serveur
server.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
