# Gestion des erreurs

Lors de la création d'une API, il est important de gérer les erreurs. En effet, si une erreur survient, il faut pouvoir la détecter et la traiter.

Si on ne capture pas les erreurs, l'API va planter et retourner une erreur 500 au client.

## Pour gérer les erreurs dans une API

Pour chaque route définie, nous envelopperons le code de nos routes dans un bloc `try...catch` pour gérer les erreurs.

Si une erreur survient, nous utiliserons la méthode `res.status()` avec le code d'erreur 500 pour indiquer que l'erreur vient du serveur accompagné d'un message précis sur l'erreur.

Ex:

```js
router.get("/", async (req, res) => {
    try {
        const docs = await db.collection("users").get();
        const users = [];

        docs.forEach((doc) => {
            const user = doc.data();
            users.push(user);
        });

        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});
```

## Révision du try...catch

En JavaScript, le bloc `try...catch` permet de capturer les erreurs qui surviennent dans le bloc `try` et de les traiter dans le bloc `catch`. Le bloc try...catch est utilisé est généralement utilisé avec des fonctions asynchrones ou avec des fonctions qui interagissent avec plusieurs systèmes (ex: base de données, API, etc.).

```js
try {
    // Code à exécuter
} catch (err) {
    // Code à exécuter si une erreur survient
}
```

De plus il est possible de lancer ses propres erreurs avec le mot clé `throw` avec une instance de l'objet `Error`. Le constructeur de l'objet `Error` prend en paramètre le message d'erreur.

Ainsi, nous pouvons contrôler les erreurs qui surviennent dans notre code et les traiter convenablement et, au besoin, générer nos propres erreurs.

```js
try {
    throw new Error("Une erreur est survenue");
} catch (err) {
    console.log(err.message); // Affiche "Une erreur est survenue"
}
```
