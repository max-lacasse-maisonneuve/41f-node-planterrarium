const http = require("http");
const Logger = require("./classes/Logger.js");
const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const { log } = require("console");
const app = express();

//Initialisation d'un fichier de variables d'environnement
require("dotenv").config();
//Ajout d'un fichier de log
const logger = new Logger();
//On assigne un port par défaut si aucune variable d'environnement n'est définie
const port = process.env.port || 5000;

// Configurateur d'un moteur de gabarit
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.engine("mustache", mustacheExpress());

// Middlewares
// Ajoute un dossier public pour les fichiers statiques (css, js, images). Ce dossier est accessible depuis le navigateur. Cela permet de ne pas avoir à créer de route pour chaque fichier statique.
app.use(express.static(path.join(__dirname, "public")));

// Routes
// Toutes les routes non statiques doivent être définies après les middlewares
app.get("/donnees", (req, res) => {
    const donneesTest = require("./data/donneesTest.js");
    logger.info(donneesTest);

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.json(donneesTest);
});

app.get("/donnees/:id", (req, res) => {
    logger.info(req.params.id);
    const donneesTest = require("./data/donneesTest.js");
    const donnees = donneesTest.find((element) => element.id == req.params.id);

    // Si la donnée est trouvée, on l'affiche en JSON
    if (donnees) {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.json(donnees);
    } else {
        // Sinon, on affiche un message d'erreur.
        // Le code 404 est utilisé pour indiquer que la donnée n'a pas été trouvée
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 404;
        res.json({ message: "Donnée non trouvée" });
    }
});

// Page 404
// Cette route doit être définie en dernier pour que les autres routes soient testées en premier
// Si aucune route n'est trouvée, alors on affiche la page 404
app.use((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 404;
    res.render("404", { url: req.url });
});

// Démarrage du serveur
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
