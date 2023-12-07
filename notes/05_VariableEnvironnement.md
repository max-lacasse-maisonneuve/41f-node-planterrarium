# Fichier .env

Ce fichier contient les variables d'environnement. Il est utilisé par le module dotenv
@see [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)

Le fichier doit obligatoirement s'appeler .env et se trouver à la racine du projet.

Le fichier .env ne doit jamais être versionné. Il doit être ajouté au fichier .gitignore
On l'ajoute manuellement sur le serveur de production (ou dans les variables d'environnement de cyclic.sh par exemple).

Il s'agit de données sensibles qui ne doivent pas être partagées. On y met par exemple les informations de connexion à la base de données, les clés secrètes, les jetons d'accès, etc.

Pour ajouter une variable d'environnement, on ajoute une ligne dans le fichier .env avec le format suivant:

```bash
NOM_VARIABLE="valeur"
```

**! - Comme il s'agit de constantes, on écrit le nom de la variable en majuscule.**

## Exemple de contenu.

```bash
PORT="5001"
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="root"
DB_PORT="3306"
DB_NAME="films"
DEBUG="true"
MODE="dev"
```

## Utilisation dans le code

On doit importer le module dotenv au début du fichier pour que les variables d'environnement soient disponibles. Assurez-vous que le module dotenv est installé.

### Installation

```bash
npm install dotenv
```

### Initialisation

```javascript
require("dotenv").config();
```

### Utilisation

Pour utiliser une variable d'environnement dans le code, on utilise l'objet `process.env`

```javascript
const port = process.env.PORT;
```
