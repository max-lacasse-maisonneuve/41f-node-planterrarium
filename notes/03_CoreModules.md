# “Core” Modules NodeJS

Table des matières

-   [Module FS: Lecture et écriture de fichiers](#module-fs-lecture-et-écriture-de-fichiers)
    -   [Utiliser le module FS](#utiliser-le-module-fs)
    -   [Lire un fichier](#lire-un-fichier)
    -   [Écrire dans un fichier](#écrire-dans-un-fichier)
    -   [Créer un dossier](#créer-un-dossier)
-   [Module Path: Gestion des chemins de fichiers](#module-path-gestion-des-chemins-de-fichiers)
    -   [Utiliser le module Path](#utiliser-le-module-path)
    -   [Constantes du module Path](#constantes-du-module-path)
    -   [Créer un chemin de fichier relatif](#créer-un-chemin-de-fichier-relatif)
    -   [Créer un chemin de fichier absolu](#créer-un-chemin-de-fichier-absolu)
    -   [Obtenir l’extension d’un fichier](#obtenir-lextension-dun-fichier)
-   [Module HTTP: Création d’un serveur web](#module-http-création-dun-serveur-web)
    -   [Utiliser le module HTTP](#utiliser-le-module-http)
    -   [Créer un serveur web](#créer-un-serveur-web)
    -   [Démarrer un serveur web](#démarrer-un-serveur-web)
-   [Autres modules “core” de NodeJS utiles](#autres-modules-core-de-nodejs-utiles)

## Qu'est-ce qu'un module “core” de NodeJS ?

Les modules “core” de NodeJS sont des modules qui sont installés par défaut avec NodeJS. Ils sont disponibles sans avoir à les installer. On peut les utiliser en important le module avec la fonction `require()`.

## Module FS: Lecture et écriture de fichiers

Le module FS permet de lire et d’écrire des fichiers. On peut l’utiliser pour lire des fichiers de données ou pour écrire des fichiers de log. Il sert également à créer des dossiers par programmation.

### Utiliser le module FS

Pour utiliser le module FS, on commence par l’importer avec la fonction `require()`.

```javascript
const fs = require("fs");
```

### Lire un fichier

Pour lire un fichier, on utilise la méthode `readFile()`. Cette méthode prend 3 paramètres:

-   Le nom du fichier à lire
-   Le format du fichier (utf8 pour un fichier texte)
-   Une fonction de callback qui prend 2 paramètres: une erreur et les données du fichier

```javascript
fs.readFile("fichier.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});
```

À noter que cette méthode est asynchrone. Cela signifie que le code qui se trouve après la méthode `readFile()` sera exécuté avant que le fichier soit lu. C’est pourquoi on utilise une fonction de callback pour afficher les données du fichier ou pour gérer les erreurs.

Il est possible d'utiliser `async/await` pour attendre que le fichier soit lu avant de continuer l'exécution du code.

```javascript
const fs = require("fs").promises;

async function lireFichier() {
    try {
        const data = await fs.readFile("fichier.txt", "utf8");
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

lireFichier();
```

_Il est possible d’utiliser la méthode `readFileSync()` pour lire un fichier de façon synchrone._

### Écrire dans un fichier

Pour écrire dans un fichier, on utilise la méthode `writeFile()`. Cette méthode prend 3 paramètres:

-   Le nom du fichier à écrire
-   Le contenu à écrire dans le fichier
-   Une fonction de callback qui prend 1 paramètre: une erreur

```javascript
const donnees = {
    nom: "Jean",
    age: 25,
};

fs.writeFile("fichier.txt", JSON.stringify(donnees), (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Le fichier a été écrit");
});
```

À noter que cette méthode est asynchrone. Cela signifie que le code qui se trouve après la méthode `writeFile()` sera exécuté avant que le fichier soit écrit. C’est pourquoi on utilise une fonction de callback pour afficher un message ou pour gérer les erreurs.

Il est possible d'utiliser `async/await` pour attendre que le fichier soit écrit avant de continuer l'exécution du code.

```javascript
const fs = require("fs").promises;

const donnees = {
    nom: "Jean",
    age: 25,
};

async function ecrireFichier() {
    try {
        await fs.writeFile("fichier.txt", JSON.stringify(donnees));
        console.log("Le fichier a été écrit");
    } catch (err) {
        console.error(err);
    }
}

ecrireFichier();
```

_Il est possible d’utiliser la méthode `writeFileSync()` pour écrire un fichier de façon synchrone._

### Créer un dossier

Pour créer un dossier, on utilise la méthode `mkdir()`. Cette méthode prend 2 paramètres:

-   Le nom du dossier à créer
-   Une fonction de callback qui prend 1 paramètre: une erreur

```javascript
fs.mkdir("dossier", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Le dossier a été créé");
});
```

## Module Path: Gestion des chemins de fichiers

Le module Path permet de gérer les chemins de fichiers. Il permet de créer des chemins de fichiers qui fonctionnent sur tous les systèmes d’exploitation.

### Utiliser le module Path

Pour utiliser le module Path, on commence par l’importer avec la fonction `require()`.

```javascript
const path = require("path");
```

---

### Constantes du module Path

Le module Path contient plusieurs constantes qui permettent de créer des chemins de fichiers.

-   `__dirname`: Le chemin du dossier du fichier courant
-   `__filename`: Le chemin du fichier courant

---

### Créer un chemin de fichier relatif

Pour créer un chemin de fichier, on utilise la méthode `join()`. Cette méthode prend minimalement 2 paramètres:

-   Le chemin du dossier
-   Le nom du fichier

On peut ajouter autant de paramètres que l'on veut pour créer un chemin vers un fichier. La méthode `join()` va créer un chemin de fichier relatif, donc depuis le dossier du projet.

```javascript
const chemin = path.join(__dirname, "fichier.txt");
```

### Créer un chemin de fichier absolu

Pour créer un chemin de fichier absolu, donc depuis la racine du projet, on utilise la méthode `resolve()`. Cette méthode prend minimalement 2 paramètres:

-   Le chemin du dossier
-   Le nom du fichier

On peut ajouter autant de paramètres que l'on veut pour créer un chemin vers un fichier.

```javascript
// Créer un chemin vers un fichier sera dans le dossier "dossier1/dossier2/fichier.txt"
const chemin = path.resolve("./", "dossier1", "dossier2", "fichier.txt");
```

### Obtenir l’extension d’un fichier

Pour obtenir l’extension d’un fichier, on utilise la méthode `extname()`. Cette méthode prend 1 paramètre: le nom du fichier.

```javascript
const extension = path.extname("fichier.txt");
```

## Module HTTP: Création d’un serveur web

Le module HTTP permet de créer un serveur web. Il permet de créer un serveur web qui écoute sur un port et qui répond aux requêtes HTTP.

### Utiliser le module HTTP

Pour utiliser le module HTTP, on commence par l’importer avec la fonction `require()`.

```javascript
const http = require("http");
```

### Créer un serveur web

Pour créer un serveur web, on utilise la méthode `createServer()`. Cette méthode prend 1 paramètre: une fonction de callback qui prend 2 paramètres: la requête et la réponse.

```javascript
const server = http.createServer((req, res) => {
    res.end("Hello World");
});
```

### Démarrer un serveur web

Pour démarrer un serveur web, on utilise la méthode `listen()`. Cette méthode prend 2 paramètres:

-   Le port sur lequel le serveur web doit écouter
-   Une fonction de callback qui est exécutée lorsque le serveur web est démarré

```javascript
server.listen(3000, () => {
    console.log("Le serveur web est démarré");
});
```

_Pour protéger notre application, on évite de d'écrire le port directement dans le code. On utilise plutôt une variable d'environnement. Cela ajoute un niveau de difficulté pour les pirates qui voudraient accéder à notre application. Voir les notes sur la variable d'environnement._

## Autres modules “core” de NodeJS utiles

### Module OS: Informations sur le système d’exploitation

Le module OS permet d’obtenir des informations sur le système d’exploitation. Il permet d’obtenir le nom de l’utilisateur, le nom de l’ordinateur, le type de système d’exploitation, etc.

Documentation: https://nodejs.org/api/os.html

### Module URL: Gestion des URL

Le module URL permet de gérer les URL. Il permet de créer des URL, de les analyser et de les modifier.

Documentation: https://nodejs.org/api/url.html

### Module Query String: Gestion des paramètres d’URL

Le module Query String permet de gérer les paramètres d’URL. Il permet de créer des paramètres d’URL, de les analyser et de les modifier.

Documentation: https://nodejs.org/api/querystring.html

### Module Events: Gestion des événements

Le module Events permet de gérer les événements. Il permet de créer des événements et d’y ajouter des écouteurs. Similaire à la gestion des événements avec le DOM, il permet de déclencher des fonctions lorsqu’un événement est lancé par une autre partie du code.

Documentation: https://nodejs.org/api/events.html
