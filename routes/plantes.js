const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

/**
 * Cette route permet de récupérer la liste des plantes
 * @route GET /plantes
 * @group Plantes - Opérations sur les plantes
 * @returns {Array.<Plante>} 200 - La liste des plantes
 */
router.get("/", async (req, res) => {
    try {
        const { orderBy = "nom", orderDirection = "asc", limit = 10 } = req.query;
        const plantesRef = await db.collection("plantes").orderBy(orderBy, orderDirection).limit(+limit).get();
        const plantes = [];

        plantesRef.forEach((doc) => {
            plantes.push(doc.data());
        });

        res.statusCode = 200;
        res.json(plantes);
    } catch (e) {
        res.statusCode = 500;
        res.json({ message: e.message });
    }
});

router.get("/:id", async (req, res) => {
    const plantesRef = await db.collection("films").doc(req.params.id).get();

    res.statusCode = 200;
    res.json(plantesRef.data());
});

router.post("/initialize", async (req, res) => {
    const donneesTest = require("../data/donneesTest.js");

    donneesTest.forEach(async (plante) => {
        await db.collection("plantes").add(plante);
    });

    res.statusCode = 200;
    res.json({ message: "Données initialisées" });
});

module.exports = router;
