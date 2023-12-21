const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const auth = require("../middlewares/auth.js");

/**
 * Cette route permet de récupérer la liste des plantes
 * @route GET /plantes
 */
router.get("/", auth, async (req, res) => {
    try {
        const { orderBy = "nom", orderDirection = "asc", limit = 10 } = req.query;
        const plantesRef = await db.collection("plantes").orderBy(orderBy, orderDirection).limit(+limit).get();
        const plantes = [];

        plantesRef.forEach((doc) => {
            plantes.push({ id: doc.id, ...doc.data() });
        });

        res.statusCode = 200;
        res.json(plantes);
    } catch (e) {
        res.statusCode = 500;
        res.json({ message: e.message });
    }
});

/**
 * Cette route permet de récupérer une plante
 * @route GET /plantes/{id}
 */
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const plantesRef = await db.collection("films").doc(id).get();

        res.statusCode = 200;
        res.json(plantesRef.data());
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * Cette route permet d'initialiser la base de données avec des données de test
 * @route POST /plantes/initialize
 */
router.post("/initialize", async (req, res) => {
    const donneesTest = require("../data/donneesTest.js");

    donneesTest.forEach(async (plante) => {
        await db.collection("plantes").add(plante);
    });

    res.statusCode = 200;
    res.json({ message: "Données initialisées" });
});

/**
 * Cette route permet de créer une plante
 * @route POST /plantes
 */
router.post("/", async (req, res) => {
    try {
        const plante = req.body;
        console.log(plante);
        const doc = await db.collection("plantes").add(plante);
        plante.id = doc.id;
        res.json(plante);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

/**
 * Cette route permet de modifier une plante
 * @route PUT /plantes/{id}
 */
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const plante = req.body;
        const modification = await db.collection("plantes").doc(id).update(plante);
        res.json(modification);
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * Cette route permet de supprimer une plante
 * @route DELETE /plantes/{id}
 */
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.collection("plantes").doc(id).delete();
        console.log(result);
        res.json({ message: `Le document avec l'id ${id} a été supprimé` });
    } catch (err) {
        res.status(500).send(err);
    }
});
module.exports = router;
