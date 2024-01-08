const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const auth = require("../middlewares/auth.js");

/**
 * Cette route permet de récupérer la liste des films
 * @route GET /films
 */
router.get("/", async (req, res) => {
    try {
        const { orderBy = "titre", orderDirection = "asc", limit = 10 } = req.query;
        const filmsRef = await db.collection("films").orderBy(orderBy, orderDirection).limit(+limit).get();
        const films = [];

        filmsRef.forEach((doc) => {
            films.push({ id: doc.id, ...doc.data() });
        });

        res.statusCode = 200;
        res.json(films);
    } catch (e) {
        res.statusCode = 500;
        res.json({ message: e.message });
    }
});

/**
 * Cette route permet de récupérer un film
 * @route GET /films/{id}
 */
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const filmsRef = await db.collection("films").doc(id).get();

        res.statusCode = 200;
        res.json(filmsRef.data());
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * Cette route permet d'initialiser la base de données avec des données de test
 * @route POST /films/initialize
 */
router.post("/initialize", async (req, res) => {
    const donneesTest = require("../data/filmsDepart.js");
    console.log(donneesTest);
    donneesTest.forEach(async (film) => {
        await db.collection("films").add(film);
    });

    res.statusCode = 200;
    res.json({ message: "Données initialisées" });
});

/**
 * Cette route permet de créer un film
 * @route POST /films
 */
router.post("/", async (req, res) => {
    try {
        const film = req.body;
        console.log(film);
        const doc = await db.collection("films").add(film);
        film.id = doc.id;
        res.json(film);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

/**
 * Cette route permet de modifier un film
 * @route PUT /films/{id}
 */
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const film = req.body;
        const modification = await db.collection("films").doc(id).update(film);
        res.json(modification);
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * Cette route permet de supprimer un film
 * @route DELETE /films/{id}
 */
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.collection("films").doc(id).delete();
        console.log(result);
        res.json({ message: `Le document avec l'id ${id} a été supprimé` });
    } catch (err) {
        res.status(500).send(err);
    }
});
module.exports = router;
