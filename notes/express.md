# Express

Table des matières

-   [Introduction](#introduction)
-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Points d'accès](#points-daccès)
    -   [L'objet `request`](#lobjet-request)
    -   [L'objet `res`](#lobjet-res)
    -   [Paramètres dynamiques de la route](#paramètres-dynamiques-de-la-route)
    -   [Paramètres de la requête (query string)](#paramètres-de-la-requête-query-string)
    -   [Le corps de la requête (pour les requêtes POST, PUT)](#le-corps-de-la-requête-pour-les-requêtes-post-put)
    -   [Retourner une réponse](#retourner-une-réponse)
        -   [Modifier le code de statut HTTP et l'en-tête de la réponse](#modifier-le-code-de-statut-http-et-len-tête-de-la-réponse)
-   [Utiliser des middlewares](#utiliser-des-middlewares)
    -   [Exemple - Définir une route pour gérer les erreurs 404](#exemple---définir-une-route-pour-gérer-les-erreurs-404)
-   [Ajouter un dossier `public` pour servir des fichiers statiques](#ajouter-un-dossier-public-pour-servir-des-fichiers-statiques)
-   [Utiliser un moteur de template pour générer des pages HTML dynamiquement](#utiliser-un-moteur-de-template-pour-générer-des-pages-html-dynamiquement)
    -   [Installer Mustache](#installer-mustache)
    -   [Configurer Express pour utiliser Mustache](#configurer-express-pour-utiliser-mustache)
    -   [Retourner une page HTML à partir d'un template](#retourner-une-page-html-à-partir-dun-template)

## Installation

Pour installer Express, il suffit d'exécuter la commande suivante :

```bash
npm install express
```

## Configuration

Pour utiliser Express, il faut commencer par l'importer dans le fichier `app.js`. Ensuite, il faut créer une application Express. Enfin, il faut démarrer le serveur en écoutant sur un port précis. Cela ressemble à ce que nous avons fait avec le module `http`.

```js
const express = require("express");
const app = express();

app.listen(3000);
```

## Points d'accès

Pour gérer une route précise, il faut définir un point d'accès. Pour cela, il faut utiliser une méthode HTTP (get, post, put, delete, etc.) et préciser la route à gérer. Ensuite, il faut définir une fonction de rappel qui sera exécutée lorsque la route sera appelée.

Cette fonction de rappel prend trois paramètres :

-   `req` : l'objet de type Request qui contient toutes les informations sur la requête
-   `res` : l'objet de type Response qui contient toutes les informations sur la réponse
-   `next` : la fonction de rappel à exécuter pour passer à la route suivante (facultatif)

```js
app.get("/", (req, res) => {
    res.send("Patate");
});
```

### L'objet `request`

L'objet `req` contient toutes les informations sur la requête HTTP. Les informations proviennent du client. Il contient notamment les informations suivantes :

-   `req.params` : les paramètres dynamiques de la route
-   `req.query` : les paramètres de la requête (query string)
-   `req.body` : le corps de la requête (pour les requêtes POST, PUT, etc.)
-   `req.headers` : les en-têtes de la requête

### L'objet `res`

L'objet `res` contient toutes les informations sur la réponse HTTP.

Il contient notamment les méthodes suivantes :

-   `res.send()` : envoie une réponse au client
-   `res.json()` : envoie une réponse au format JSON
-   `res.redirect()` : redirige vers une autre route
-   `res.render()` : génère une page HTML à partir d'un template (Voir la section sur les moteurs de template)
-   `res.status()` : définit le code de statut HTTP de la réponse
-   `res.setHeader()` : définit un en-tête de la réponse
-   `res.end()` : termine la réponse. Cette méthode est appelée automatiquement par `res.send()` et `res.json()`.

L'objet `res` contient également les propriétés suivantes :

-   `res.statusCode` : le code de statut HTTP de la réponse
-   `res.statusMessage` : le message associé au code de statut HTTP de la réponse

### Paramètres dynamiques de la route

Pour respecter les normes REST, il est important de bien définir les routes de l'API. Lorsque nous voulons accéder à une ressource précise, nous ajoutons l'identifiant de la ressource à la fin de la route. Par exemple, pour accéder à l'utilisateur 1, nous utilisons la route `/users/1`. Cependant, il n'est pas optimal de définir pas une route pour chaque utilisateur. Nous utilisons plutôt un paramètre dynamique dans la route et enverrons un message d'erreur si l'utilisateur n'existe pas.

Pour définir des paramètres dynamiques dans une route, il faut utiliser le caractère `:` suivi du nom du paramètre. Ex: `/users/:id`.

Pour accéder aux paramètres dynamiques de la route, nous utilisons la propriété `req.params`. Cet objet contient tous les paramètres dynamiques de la route.

```js
app.get("/users/:id", (req, res) => {
    res.send(`L'utilisateur ${req.params.id}`);
});
```

### Paramètres de la requête (query string)

Les paramètres de la requête sont utilisés pour filtrer les données. Par exemple, pour obtenir les utilisateurs dont le nom commence par "A", nous pouvons utiliser la route `/users?name=A`. Les paramètres de la requête sont ajoutés à la fin de la route et sont séparés par le caractère `?`. Chaque paramètre est composé d'un nom et d'une valeur séparés par le caractère `=`. Les paramètres sont séparés par le caractère `&`.

Pour accéder aux paramètres de la requête, nous utilisons la propriété `req.query`. Cet objet contient tous les paramètres de la requête.

```js
app.get("/users", (req, res) => {
    res.send(`L'utilisateur ${req.query.name}`);
});
```

### Le corps de la requête (pour les requêtes POST, PUT)

Le corps de la requête est utilisé pour envoyer des données au serveur. Par exemple, pour créer un nouvel utilisateur, nous pouvons envoyer les données suivantes : `{ name: "John" }`. Les données sont envoyées dans le corps de la requête. Pour accéder au corps de la requête, nous utilisons la propriété `req.body`. Cet objet contient toutes les données envoyées dans le corps de la requête.

L'initialisation du corps de la requête n'est pas activée par défaut. Pour l'activer, il faut utiliser la méthode `app.use()` avec la fonction `express.json()` si les données sont envoyées au format JSON ou la fonction `express.urlencoded()` si les données sont envoyées au format `x-www-form-urlencoded` (Pour les formulaires HTML)

**_À noter que l'initialisation du corps de la requête doit être placée avant les routes._**

```js
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
```

Ensuite, dans les routes POST, PUT, etc., nous pouvons accéder au corps de la requête avec la propriété `req.body`.

```js
app.post("/users", (req, res) => {
    const user = req.body;
    res.send(`L'utilisateur ${user.name} a été créé`);
});
```

### Retourner une réponse

Il existe plusieurs méthodes pour retourner une réponse au client.

-   La méthode `res.send()` permet de retourner une réponse de type texte.
-   La méthode `res.json()` permet de retourner une réponse de type JSON.
-   La méthode `res.render()` permet de générer une page HTML à partir d'un template. Voir la section sur les moteurs de template.

Par défaut, le code de statut HTTP est 200 et l'en-tête `Content-Type` est `text/html`.
La méthode .json() définit automatiquement l'en-tête `Content-Type` à `application/json`.

La majorité du temps, une API retournera une réponse de type JSON. Pour cela, il faut utiliser la méthode `res.json()`. Pas besoin de convertir l'objet en chaîne de caractères JSON, la méthode s'en occupe automatiquement. La méthode accepte un tableau ou un objet au format JSON valide.

```js
app.get("/users", (req, res) => {
    res.json([
        {
            id: 1,
            name: "John",
        },
        {
            id: 2,
            name: "Jane",
        },
    ]);
});
```

#### Modifier le code de statut HTTP et l'en-tête de la réponse

Parfois, il est nécessaire de préciser un autre code de statut HTTP et un autre en-tête. Ex: dans le cas d'une erreur, il est préférable de retourner un code de statut HTTP 404.

Il est possible de modifier ces valeurs en utilisant les méthodes `res.status()` et `res.setHeader()`.

```js
app.get("/users", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(404).json({
        message: "La ressource n'existe pas",
    });
});
```

### Utiliser des middlewares

Un middleware est une fonction qui est exécutée avant d'atteindre la route finale. Il est possible d'ajouter un middleware à une route précise ou à toutes les routes. Cela permet d'ajouter des fonctionnalités supplémentaires à l'application, ex: authentification, validation des données, etc.

Pour ajouter un middleware à une route précise, il faut utiliser la méthode `app.use()`. Dans l'exemple suivant, le middleware est exécuté avant d'atteindre la route `/users`.

```js
app.use("/users", (req, res, next) => {
    console.log("Middleware");
    next();
});
```

#### Exemple - Définir une route pour gérer les erreurs 404

Pour définir une route pour gérer les erreurs 404, nous utilisons la méthode `app.use()` sans préciser de route. Cette route sera exécutée si aucune autre route n'a été trouvée car les autres routes s'arrêtent lors de la commande send ou json.

La route pour gérer les erreurs 404 doit obligatoirement être définie à la fin des routes car sinon elle interceptera toutes les requêtes et les autres routes ne seront jamais exécutées.

```js
app.use((req, res, next) => {
    res.status(404).json({
        message: "La ressource n'existe pas",
    });
});
```

### Ajouter un dossier `public` pour servir des fichiers statiques

Les fichiers statiques sont des fichiers qui ne changent pas. Ex: images, fichiers CSS, fichiers JavaScript, etc. Normalement, il faudrait définir une route pour chaque fichier statique. Cependant, Express permet de servir des fichiers statiques à partir d'un dossier. Tous les fichiers du dossier seront accessibles à partir de la racine du serveur.

Pour cela, il faut utiliser la méthode `app.use()` avec la fonction `express.static()`.

**_ À noter que l'ajout du dossier public doit être placé avant les routes._**

```js
// Le dossier public sera accessible à partir de la racine du serveur
// On utilise la fonction express.static() pour servir des fichiers statiques
// La fonction path.join() permet de joindre le chemin du dossier public au chemin du dossier courant (__dirname). Ne pas oublier d'importer le module path.
app.use(express.static(path.join(__dirname, "public")));
```

### Utiliser un moteur de template pour générer des pages HTML dynamiquement

Pour générer des pages HTML dynamiquement, nous utilisons un moteur de template. Un moteur de template permet de générer des pages HTML à partir de templates. Un template est un fichier HTML qui contient des variables. Le moteur de template remplace les variables par les valeurs correspondantes.

Il existe plusieurs moteurs de template pour Express. Ex: Pug, EJS, Handlebars, Mustache, etc. Dans cet exemple, nous utiliserons le moteur de template Mustache.

#### Installer Mustache

Pour utiliser Mustache, il faut installer le module `mustache-express`.

```bash
npm install mustache-express
```

#### Configurer Express pour utiliser Mustache

Ensuite, il faut configurer Express pour utiliser le moteur de template. Pour cela, il faut utiliser la méthode `app.engine()` pour définir le moteur de template. Ensuite, il faut utiliser la méthode `app.set()` pour définir le dossier contenant les templates et le moteur de template à utiliser.

Premièrement, il faut importer le module `mustache-express`.

```js
const mustacheExpress = require("mustache-express");
```

Ensuite, il faut définir le moteur de template et le dossier contenant les templates. Le dossier contenant les templates doit être défini à partir du dossier courant. Pour cela, nous utilisons la fonction `path.join()`.
Enfin, il faut définir le moteur de template à utiliser avec la méthode `app.engine()`.

```js
// Définition du moteur de template
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.engine("mustache", mustacheExpress());
```

La même méthode peut être utilisée pour définir un autre moteur de template, ex: EJS, Pug, Handlebars, etc. Lire la documentation de chaque moteur de template pour connaître la méthode à utiliser.

#### Retourner une page HTML à partir d'un template

Tous les templates doivent avoir l'extension `.mustache` et doivent être placés dans le dossier `views`.

Pour générer une page HTML à partir d'un template, il faut utiliser la méthode `res.render()`. Cette méthode prend deux paramètres :

-   Le nom du template à utiliser
-   Un objet contenant les variables à remplacer dans le template

```js
app.get("/", (req, res) => {
    res.render("index", {
        title: "Accueil",
        message: "Bienvenue sur mon site",
        liste: [
            {
                id: 1,
                name: "John",
            },
            {
                id: 2,
                name: "Jane",
            },
        ],
    });
});
```

---

Pour connaître la syntaxe du moteur de template, il faut consulter la documentation du moteur de template utilisé. Pour Mustache, la syntaxe est la suivante :

```html
<div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
</div>
<ul>
    {{#liste}}
    <li>{{id}} - {{name}}</li>
    {{/liste}}
</ul>
```
