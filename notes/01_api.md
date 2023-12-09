# Les bases d'une API REST

Table des matières

-   [Définition](#définition)
-   [Fonctionnement](#fonctionnement)
-   [Requêtes](#requêtes)
    -   [Méthodes HTTP](#méthodes-http)
    -   [Points d'accès](#points-daccès)
        -   [Normes de nommage](#normes-de-nommage)
    -   [Entêtes HTTP](#entêtes-http)
        -   [Les types de contenu](#les-types-de-contenu)
        -   [Cross-Origin Resource Sharing (CORS)](#cross-origin-resource-sharing-cors)
        -   [Autorisation](#autorisation)
    -   [Paramètres](#paramètres)
        -   [Query string](#query-string)
        -   [Body](#body)
-   [Réponses](#réponses)
    -   [Codes de statut HTTP](#codes-de-statut-http)

## Définition

Une API REST est une interface de programmation applicative qui permet de communiquer avec une application web. Elle permet de récupérer des données et d'effectuer des actions sur ces données.

## Fonctionnement

Une API REST est basée sur le protocole HTTP. Elle utilise les méthodes HTTP pour effectuer des actions sur des ressources. Par exemple, la méthode `GET` permet de récupérer une ressource, la méthode `POST` permet de créer une ressource, la méthode `PUT` permet de modifier une ressource, etc.

Une API REST utilise des points d'accès pour identifier les ressources. Par exemple, `/users` permet de récupérer tous les utilisateurs, `/users/1` permet de récupérer l'utilisateur ayant l'identifiant 1, etc.

Une API REST utilise des formats de données pour représenter les données. Par exemple, le format JSON permet de représenter des données sous la forme d'un objet JavaScript. D'autres formats de données existent, comme le format XML, CSV, Binary, etc.

## Requêtes

Les requêtes sont les demandes que l'on fait à une API REST ou à un serveur HTTP. Elles sont composées de plusieurs éléments : les méthodes HTTP, les points d'accès, les entêtes HTTP et les paramètres.

### Méthodes HTTP

Une API REST utilise les méthodes HTTP pour effectuer des actions sur des ressources. Les méthodes HTTP les plus utilisées sont les suivantes :

-   `GET` : Récupérer une ressource
-   `POST` : Créer une ressource
-   `PUT` : Modifier une ressource
-   `DELETE` : Supprimer une ressource

Une API REST peut utiliser d'autres méthodes HTTP, mais elles sont moins utilisées. Ex: `PATCH`, `HEAD`, `OPTIONS`, etc.

Les méthodes permettent de trier les actions effectuées sur les ressources. La même URL peut être utilisée pour effectuer plusieurs actions différentes. Par exemple, l'URL `/users` peut être utilisée pour récupérer tous les utilisateurs (`GET`), ou pour créer un utilisateur (`POST`).

### Points d'accès

Les points d'accès permettent d'identifier les ressources. Ils sont composés d'une URL et d'une méthode HTTP. Par exemple, l'URL `/users` permet de récupérer tous les utilisateurs (`GET`), l'URL `/users/1` permet de récupérer l'utilisateur ayant l'identifiant 1 (`GET`), l'URL `/users` permet de créer un utilisateur (`POST`), etc.

Les points d'accès sont composés de plusieurs parties :

-   Le protocole : `http://` ou `https://`
-   Le nom de domaine : `localhost:3000`
-   Le chemin : `/users/2`
-   Les paramètres : `?name=Maxime&age=25`

#### Normes de nommage

Les points d'accès sont nommés selon des normes. On utilise généralement le pluriel pour les ressources, et le singulier pour les ressources uniques.

On peut préciser l'identifiant unique d'une ressource en ajoutant `/1` à la fin de l'URL. Par exemple, `/users` permet de récupérer tous les utilisateurs, et `/users/1` permet de récupérer l'utilisateur ayant l'identifiant 1.

On peut également utiliser des sous-ressources. Par exemple, `/users/1/posts` permet de récupérer tous les posts de l'utilisateur ayant l'identifiant 1.

-   `GET /users` : Récupérer tous les utilisateurs
-   `GET /users/1` : Récupérer l'utilisateur ayant l'identifiant 1 (ou identifiant unique)
-   `POST /users` : Créer un utilisateur
-   `PUT /users/1` : Modifier l'utilisateur ayant l'identifiant 1 (ou identifiant unique)
-   `DELETE /users/1` : Supprimer l'utilisateur ayant l'identifiant 1 (ou identifiant unique)

Pour trier ou filtrer un groupe de ressources, on utilisera les paramètres supplémentaires. Par exemple, `GET /users?name=John` permet de récupérer tous les utilisateurs ayant le nom "John".

### Entêtes HTTP

Chaque requête et réponse HTTP contient des entêtes HTTP. Les entêtes HTTP permettent de transmettre des informations supplémentaires au serveur ou au navigateur. Les entêtes sont des paires clé/valeur.

Par exemple, l'entête `Content-Type` permet de préciser le format de données utilisé pour la requête.
Des exemples des entêtes les plus utilisés sont disponibles ci-dessous.

-   `Content-Type` : Format de données utilisé pour la requête

-   `Authorization` : Informations d'authentification de l'utilisateur
-   `Accept` : Format de données attendu pour la réponse
-   `Cross-Origin Resource Sharing` (CORS) : Autoriser les requêtes depuis un autre domaine
-   `Api-Key` : Clé d'API pour authentifier une application
-   `Cache-Control` : Durée de vie du cache
-   `Content-Encoding` : Encodage utilisé pour la réponse

#### Les types de contenu

Le type de contenu permet de préciser le format de données utilisé pour la requête ou la réponse. Les types de contenu les plus utilisés sont les suivants :

-   `text/plain` : Texte brut
-   `text/html` : HTML
-   `application/json` : JSON
-   `application/xml` : XML

Moins courants :

-   `application/x-www-form-urlencoded` : Envoyé par défaut par les formulaires HTML.
-   `multipart/form-data` : Formulaire envoyé par un formulaire HTML permettant d'envoyer des fichiers.
-   `application/pdf` : PDF
-   `application/octet-stream` : Binary

Une liste exhaustive des types de contenu est disponible sur le site [MDN](https://developer.mozilla.org/fr/docs/Web/HTTP/Basics_of_HTTP/MIME_types).

#### Cross-Origin Resource Sharing (CORS)

Le Cross-Origin Resource Sharing (CORS) permet d'autoriser les requêtes depuis un autre domaine. Par défaut, les requêtes sont bloquées pour des raisons de sécurité.

Pour autoriser les requêtes depuis un autre domaine, il faut ajouter l'entête `Access-Control-Allow-Origin` avec la valeur `*` pour autoriser toutes les requêtes, ou avec la valeur du domaine pour autoriser uniquement les requêtes depuis ce domaine.

Il s'agit d'une mesure de sécurité pour éviter que n'importe qui puisse accéder à l'API. Par exemple, si l'API est utilisée pour stocker des données sensibles, il ne faut pas autoriser les requêtes depuis n'importe quel domaine. Il faut autoriser uniquement les requêtes depuis le domaine de l'application.

Par exemple, si l'API est utilisée par l'application `https://mon-application.com`, il faut ajouter l'entête `Access-Control-Allow-Origin` avec la valeur `https://mon-application.com`.

#### Autorisation

L'entête `Authorization` permet d'envoyer des informations d'authentification à l'API. Par exemple, si l'API utilise un système d'authentification par token, il faut ajouter l'entête `Authorization` avec la valeur `Bearer <token>`. Nous verrons dans un prochain cours comment mettre en place un système d'authentification par token.

### Paramètres

Les paramètres permettent de transmettre des informations supplémentaires à une requête. Ils sont composés d'une clé et d'une valeur. Ils sont utilisés pour trier ou filtrer les ressources.

#### Query string

Elles sont utilisées pour transmettre des paramètres dans l'URL. Elles sont composées d'un point d'interrogation `?` suivi de la clé et de la valeur séparées par un signe égal `=`. Les paramètres sont séparés par un signe `&`.

Elles sont récupérées sous forme d'objet dans le code avec `req.query`.

#### Body

Le body est utilisé pour transmettre des paramètres dans le corps de la requête. Il est composé d'une clé et d'une valeur. Il est utilisé pour créer ou modifier une ressource. Généralement, le body est envoyé au format JSON.

Il est récupéré sous forme d'objet dans le code avec `req.body`. Avec Express, il faut indiquer à l'application le format de données utilisé pour le body avec `app.use(express.json())` ou `app.use(express.urlencoded({ extended: true }))`.

## Réponses

Les réponses sont les réponses envoyées par une API REST ou un serveur HTTP. Elles sont composées de plusieurs éléments : les codes de statut HTTP, les entêtes HTTP et les formats de données.

### Codes de statut HTTP

Les codes de statut HTTP permettent de préciser le résultat d'une requête. Ils sont composés d'un code numérique et d'un message. Les codes de statut HTTP sont séparés en 5 catégories :

-   1xx : Information
-   2xx : Succès
-   3xx : Redirection
-   4xx : Erreur client. Ex: L'utilisateur a demandé une ressource qui n'existe pas, ou qui n'est pas autorisée.
-   5xx : Erreur serveur. Ex: Le serveur a rencontré une erreur. Le problème vient du serveur, pas de l'utilisateur.

Les codes de statut HTTP sont les suivants :

-   `200 OK` : Requête traitée avec succès.
-   `201 Created` : Requête traitée avec succès et création d'une ressource (POST)
-   `204 No Content` : Requête traitée avec succès mais pas d'information à renvoyer (DELETE)
-   `301 Moved Permanently` : Ressource déplacée de façon permanente. Sert lors de la redirection d'une page web
-   `304 Not Modified` : Ressource non modifiée
-   `400 Bad Request` : La syntaxe de la requête est erronée
-   `401 Unauthorized` : Une authentification est nécessaire pour accéder à la ressource
-   `403 Forbidden` : Le serveur a compris la requête mais refuse de l'exécuter
-   `404 Not Found` : Ressource non trouvée
-   `405 Method Not Allowed` : Méthode de requête non autorisée
-   `500 Internal Server Error` : Erreur interne du serveur

Vous aurez à définir les codes de statut HTTP dans vos applications. Par exemple, si un utilisateur tente de se connecter avec un mauvais mot de passe, vous pouvez renvoyer le code `401 Unauthorized`. Si un utilisateur tente de créer un compte avec un email déjà utilisé, vous pouvez renvoyer le code `400 Bad Request`.
