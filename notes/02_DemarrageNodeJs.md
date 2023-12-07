# Installation d’un projet NodeJS

1. On crée un repository sur Github
2. On initialise le projet avec `npm init`
3. On installe les dépendances avec `npm install`
4. On installe les dépendances de développement avec `npm install --save-dev`
5. On crée un fichier `.env` pour les variables d’environnement
6. On crée un fichier `.gitignore` et on ajoute le dossier `node_modules` à l’intérieur pour éviter de versionner celui-ci. On ajoute également le fichier `.env` pour éviter de versionner les variables d’environnement.
7. On crée un fichier de code `server.js`

8. On pousse les changements sur Github

## Packages utilisés dans le projet

#### Dotenv

Le module dotenv permet de charger les variables d’environnement à partir du fichier `.env`. Il est installé en tant que dépendance avec la commande suivante:

```bash
npm install dotenv
```

Documentation: https://www.npmjs.com/package/dotenv

#### Nodemon

Nodemon est un outil qui permet de redémarrer automatiquement le serveur à chaque fois qu’un fichier est modifié. C’est un outil très pratique pour le développement. Il est installé en tant que dépendance de développement avec la commande suivante:

```bash
npm install nodemon --save-dev
```

Documentation: https://www.npmjs.com/package/nodemon

#### Express

Express est un framework qui permet de créer des applications web avec NodeJS. Il est installé en tant que dépendance avec la commande suivante:

```bash
npm install express
```

Documentation: https://expressjs.com/fr/
