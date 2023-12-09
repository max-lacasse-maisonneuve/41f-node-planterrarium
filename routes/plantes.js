const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.get("/", async (req, res) => {
    const plantesRef = await db.collection("films").get();
    const plantes = [];
    plantesRef.forEach((doc) => {
        plantes.push(doc.data());
    });

    res.statusCode = 200;
    res.json(plantes);
});

router.get("/:id", async (req, res) => {
    const plantesRef = await db.collection("films").doc(req.params.id).get();

    res.statusCode = 200;
    res.json(plantesRef.data());
});
module.exports = router;
