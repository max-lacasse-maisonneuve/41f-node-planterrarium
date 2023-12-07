# Création d'un serveur Javascript et introduction à NodeJS

Table des matières

-   [Javascript côté serveur et NPM](#javascript-côté-serveur-et-npm)
-   [Exemples d’utilisation de NodeJS](#exemples-dutilisation-de-nodejs)
-   [Installation de NodeJS](#installation-de-nodejs)
    -   [Vérifier la version de NodeJS](#vérifier-la-version-de-nodejs)
    -   [Vérifier la version de NPM](#vérifier-la-version-de-npm)
-   [Démarrer un projet avec NodeJS](#démarrer-un-projet-avec-nodejs)
    -   [Initialisation du projet](#initialisation-du-projet)
    -   [Installer et désinstaller un package](#installer-et-désinstaller-un-package)
    -   [Différence entre une dépendance et une dépendance de développement](#différence-entre-une-dépendance-et-une-dépendance-de-développement)
    -   [Exploration du fichier package.json](#exploration-du-fichier-packagejson)

## Objectifs

-   Qu'est-ce que Javascript côté serveur ?
-   Démarrer un projet avec NodeJS, NPM et Github

    -   Installer/Désinstaller un package
    -   Scripts de démarrage

-   Installation d’un environnement de développement
-   Exemples d’utilisation de NodeJS
-   “Core” Modules NodeJS
    -   fs, path, http

## Javascript côté serveur et NPM

Javascript est un langage de programmation qui peut être utilisé côté client (navigateur) ou côté serveur (NodeJS). Il est donc possible de créer des applications web complètes avec Javascript.

NodeJS est un environnement d’exécution Javascript côté serveur. Il permet d’exécuter du code Javascript en dehors du navigateur. NodeJS est basé sur le moteur Javascript V8 de Google Chrome. Il est open source et multiplateforme. Il est donc possible d’exécuter du code Javascript sur un serveur Linux, Windows ou Mac.

NodeJS est très performant et permet de créer des applications web rapides et évolutives. Il est très populaire et est utilisé par de nombreuses entreprises.

NPM (Node Package Manager) est le gestionnaire de paquets officiel de NodeJS. Il permet d’installer des packages et de gérer les dépendances d’un projet. Il sert également à initialiser un projet et à démarrer un projet.

**Lorsqu'on installe NodeJS, NPM est automatiquement installé avec.**

## Exemples d’utilisation de NodeJS

NodeJS est très polyvalent et peut être utilisé pour créer des applications web, des applications de bureau, des applications mobiles, des jeux vidéos, des applications en temps réel, des outils de ligne de commande, etc.

Il peut servir à automatiser des tâches répétitives et fastidieuses. Par exemple, on peut utiliser NodeJS pour créer un script qui va compresser automatiquement les images d’un projet web ou qui va initialiser le contenu d'une base de données.

Il peut servir à créer des outils de ligne de commande. Par exemple, on peut utiliser NodeJS pour créer un outil de ligne de commande qui va créer automatiquement un nouveau projet web.

Étant très performant, NodeJS est souvent utilisé pour créer des applications web rapides et évolutives. Il est très populaire et est utilisé par de nombreuses entreprises.

On peut également gérer plusieurs requêtes simultanément avec NodeJS et les WebSockets. Cela permet de créer des applications en temps réel comme des jeux vidéos, des applications de clavardage ou des outils de collaboration.

En utilisant un outil comme `Electron`, il est possible de compilier un projet Nodejs pour créer des applications de bureau avec NodeJS. Cela permet de créer des applications de bureau multiplateformes avec des technologies web installées sur l’ordinateur de l’utilisateur.
https://www.npmjs.com/package/electron

## Installation de NodeJS

Pour installer NodeJS, on se rend sur le site officiel [https://nodejs.org/en/](https://nodejs.org/en/) et on télécharge la version LTS (Long Term Support).

### Vérifier la version de NodeJS

Pour vérifier la version de NodeJS, on utilise la commande `node -v`.

```bash
node -v
```

### Vérifier la version de NPM

Pour vérifier la version de NPM, on utilise la commande `npm -v`.

```bash
npm -v
```

## Démarrer un projet avec NodeJS

### Initialisation du projet

Pour démarrer un projet avec NodeJS, on utilise la commande `npm init`. Cette commande va créer un fichier `package.json` qui contient les informations du projet et les dépendances.

```bash
npm init
```

---

### Installer et désinstaller un package

Pour installer un package, on utilise la commande `npm install`. Par exemple, pour installer le package `express`, on utilise la commande suivante:

```bash
npm install express
```

Pour désinstaller un package, on utilise la commande `npm uninstall`. Par exemple, pour désinstaller le package `express`, on utilise la commande suivante:

```bash
npm uninstall express
```

### Différence entre une dépendance et une dépendance de développement

Lorsqu’on installe un package avec la commande `npm install`, le package est installé en tant que dépendance. Lorsqu’on installe un package avec la commande `npm install --save-dev`, le package est installé en tant que dépendance de développement.

Les dépendances de développement sont des packages qui sont utilisés uniquement pendant le développement. Par exemple, le package `nodemon` est utilisé pour redémarrer automatiquement le serveur à chaque fois qu’un fichier est modifié. C’est un outil très pratique pour le développement, mais il n’est pas nécessaire en production. On l’installe donc en tant que dépendance de développement.

Certains outils comme cyclic.sh, Jenkins ou Docker peuvent ignorer les dépendances de développement lors du processus de déploiement. Cela a pour effet de réduire la taille du projet et d’accélérer le processus de déploiement. Il est donc important de bien comprendre la différence entre les deux.

---

### Exploration du fichier package.json

Le fichier `package.json` contient les informations du projet et les dépendances. Il est important de bien comprendre la structure de ce fichier.

```json
{
    "name": "41f-node-planterrarium",
    "version": "1.0.0",
    "description": "Projet de démonstration pour le cours 41F",
    "main": "server.js",
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js"
    },
    "keywords": ["nodejs", "cours", "41f"],
    "author": "Simon Côté-Bouchard & Maxime Lacasse-Germain",
    "license": "ISC",
    "dependencies": {
        "dotenv": "^10.0.0",
        "express": "^4.17.1"
    },
    "devDependencies": {
        "nodemon": "^2.0.12"
    }
}
```

La portion scripts permet de définir des scripts qui peuvent être exécutés avec la commande `npm run`. Par exemple, pour exécuter le script `start`, on utilise la commande `npm run start`.

Pour exécuter le script `dev`, on utilise la commande `npm run dev`.

---

