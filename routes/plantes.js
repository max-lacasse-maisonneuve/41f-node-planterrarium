const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const auth = require("../middlewares/auth.js");

/**
 * @route GET /plantes
 * @description Cette route permet de récupérer la liste des plantes
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
 * @route GET /plantes/{id}
 * @description Cette route permet de récupérer une plante spécifique par son ID
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
 * @route POST /plantes/initialize
 * @description Cette route permet d'initialiser la base de données avec des données de test
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
 * @route POST /plantes
 * @description Cette route permet de créer une nouvelle plante
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
 * @route PUT /plantes/{id}
 * @description Cette route permet de modifier une plante spécifique par son ID
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
 * @route DELETE /plantes/{id}
 * @description Cette route permet de supprimer une plante spécifique par son ID
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
