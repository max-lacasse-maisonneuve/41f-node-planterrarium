# Routeur avec ExpressJS

## Séparer les routes en fichiers

Lorsque le nombre de routes augmente, le fichier `server.js` devient vite illisible. Il peut être intéressant de séparer les routes en plusieurs fichiers. Idéalement, il faudrait séparer les routes par ressources.

Par exemple, les routes pour les utilisateurs dans un fichier `users.js`, les routes pour les articles dans un fichier `articles.js`, etc.

Nous placerons les fichiers de routes dans un dossier `routes` à la racine du projet.

Dans chacun des fichiers, il faut importer le module `express` et créer un routeur avec la méthode `express.Router()`. Ensuite, il faut définir les routes comme à l'habitude avec les méthodes `get()`, `post()`, `put()`, `delete()`, etc. et exporter le routeur avec `module.exports = router`.

**_À noter, que les routes définies dans les fichiers de routes sont des routes "partielles". Par exemple, si on définit une route `"/"` dans le fichier `users.js`, elle sera accessible à l'adresse `/users/` et non à l'adresse `/`._**

Dans le fichier `server.js`, il faut importer les fichiers de routes et les utiliser avec la méthode `app.use()`.

### Exemple

```js
// routes/users.js
const express = require("express");
const router = express.Router();

// Route "/users/"
router.get("/", (req, res) => {
    res.send("Liste des utilisateurs");
});

// Route "/users/:id"
router.get("/:id", (req, res) => {
    res.send(`Utilisateur ${req.params.id}`);
});

module.exports = router;
```

```js
// server.js
const express = require("express");
const app = express();

// Routes
const usersRoutes = require("./routes/users");
const articlesRoutes = require("./routes/articles");

app.use("/users", usersRoutes);
app.use("/articles", articlesRoutes);

app.listen(3000);
```
