# Import/export de modules avec CommonJS vs ES6

NodeJS utilise le système de modules CommonJS pour importer et exporter des modules. Ce système est différent du système ES6 utilisé dans les navigateurs.

En effet, le système ES6 utilise les mots-clés `import` et `export` pour importer et exporter des modules. Le système CommonJS utilise les fonctions `require()` et `module.exports` pour importer et exporter des modules.

Le core-module `module` est un objet global qui contient la propriété `exports`. Cette propriété est utilisée pour exporter des modules.

Ceci permet de séparer le code en plusieurs fichiers et de le réutiliser dans d'autres fichiers. Comme vu dans le cours sur l'orienté objet, cela permet de réduire la complexité du code et de le rendre plus maintenable.

## Exporter un module avec CommonJS (NodeJS)

Pour exporter un module avec CommonJS, on utilise la propriété `module.exports`.

```javascript
const donnees = {
    nom: "Jean",
    age: 25,
};

module.exports = donnees;
```

---

### Exporter plusieurs modules avec CommonJS (NodeJS)

Pour exporter plusieurs modules avec CommonJS, on utilise la propriété `module.exports`.

```javascript
const donnees = {
    nom: "Jean",
    age: 25,
};

const donnees2 = {
    nom: "Marie",
    age: 30,
};

module.exports = {
    donnees,
    donnees2,
};
```

## Importer un module avec CommonJS (NodeJS)

Pour importer un module avec CommonJS, on utilise la fonction `require()`.

```javascript
const express = require("express");
```

---

### Importer plusieurs modules avec CommonJS (NodeJS)

Pour importer plusieurs modules avec CommonJS, on utilise la fonction `require()`.

```javascript
const { donnees, donnees2 } = require("./donnees");
```

## Différence entre CommonJS et ES6

Ne pas confondre le système de modules CommonJS utilisé par NodeJS et le système ES6 utilisé dans les navigateurs. Nodejs lèvera une erreur si on utilise les mots-clés `import` et `export`. Il est possible désormais d'utiliser le système ES6 dans NodeJS avec le flag `--experimental-modules`, mais ce n'est pas recommandé pour le moment.

### Documentation

-   [https://nodejs.org/api/modules.html](https://nodejs.org/api/modules.html)
