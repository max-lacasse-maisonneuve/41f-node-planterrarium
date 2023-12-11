const http = require("http");
const fs = require("fs");
const Logger = require("./classes/Logger.js");

//Initialisation d'un fichier de variables d'environnement
require("dotenv").config();

//Ajout d'un fichier de log
const logger = new Logger();

//Création d'un serveur
const server = http.createServer((request, response) => {
    // Gestion de la route principale
    if (request.method == "GET" && request.url == "/") {
        //On récupère un fichier et on le lit
        const file = fs.readFileSync("./public/index.html", "utf8");

        //On prépare l'entête de réponse
        response.setHeader("Content-Type", "text/html");
        response.statusCode = 200;

        //On envoie la réponse
        response.send(file);
    } else {
        // Page par défaut si la requête n'existe pas
        const file = fs.readFileSync("./public/404.html", "utf8");

        //On prépare l'entête de réponse
        response.setHeader("Content-Type", "text/html");
        //On indique que la ressouces est manquante. Évite d'indexer la page sur les requêtes Google
        response.statusCode = 404;

        //On envoie la réponse
        response.end(file);
    }
});

//On assigne un port par défaut si aucune variable d'environnement n'est définie
const port = process.env.PORT || 5000;

// Démarrage du serveur
server.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
