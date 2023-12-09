const http = require("http");
const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");

// ===== INITIALISATION VARIABLES D'ENVIRONNEMENT
require("dotenv").config();

// ===== INITIALISATION DU SERVEUR
const app = express();
const port = process.env.port || 5000;

// ===== MOTEUR DE GABARIT
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.engine("mustache", mustacheExpress());

// ===== MIDDLEWARES
// Ajoute un dossier public pour les fichiers statiques (css, js, images).
// Doit être défini avant les routes
app.use(express.static(path.join(__dirname, "public")));

// ===== ROUTES
// Toutes les routes non statiques doivent être définies après les middlewares
app.use("/plantes", require("./routes/plantes.js"));

// ===== PAGE 404
// Cette route doit être définie en dernier pour que les autres routes soient testées en premier
// Si aucune route n'est trouvée, alors on affiche la page 404
app.use((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 404;
    res.render("404", { url: req.url });
});

// ===== DÉMARRAGE DU SERVEUR
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
