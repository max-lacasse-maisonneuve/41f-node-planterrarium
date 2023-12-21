const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth.js");
/**
 * Cette route permet de récupérer la liste des plantes
 * @route GET /plantes
 */
router.get("/", auth, async (req, res) => {
    try {
        const utilisateursRef = await db.collection("utilisateurs").get();
        const utilisateurs = [];

        utilisateursRef.forEach((doc) => {
            utilisateurs.push({ id: doc.id, ...doc.data() });
        });

        res.statusCode = 200;
        res.json(utilisateurs);
    } catch (e) {
        res.statusCode = 500;
        res.json({ message: e.message });
    }
});

/**
 * Cette route permet d'initialiser la base de données avec des données de test
 * @route POST /plantes/initialize
 */
router.post("/initialize", async (req, res) => {
    const donneesTest = require("../data/donneesUtilisateursTest.js");

    await donneesTest.forEach(async (utilisateur) => {
        const motDePasse = utilisateur.mdp;
        const courriel = utilisateur.courriel;

        const docRef = await db.collection("utilisateurs").where("courriel", "==", courriel).get();
        const utilisateurs = [];

        docRef.forEach(async (doc) => {
            utilisateurs.push({ id: doc.id, ...doc.data() });
        });

        if (utilisateurs.length == 0) {
            const hash = await bcrypt.hash(motDePasse, 10);
            const user = { courriel, mdp: hash };
            await db.collection("utilisateurs").add(user);
        }
    });

    res.statusCode = 200;
    res.json({ message: "Données initialisées" });
});

/**
 * Cette route permet de créer une plante
 * @route POST /plantes
 */
router.post("/inscription", async (req, res) => {
    try {
        const motDePasse = req.body.mdp;
        const courriel = req.body.courriel;

        const docRef = await db.collection("utilisateurs").where("courriel", "==", courriel).get();
        const utilisateurs = [];

        docRef.forEach(async (doc) => {
            utilisateurs.push({ id: doc.id, ...doc.data() });
        });

        if (utilisateurs.length > 0) {
            res.statusCode = 400;
            res.json({ message: "Courriel déjà utilisé" });
        } else {
            const hash = await bcrypt.hash(motDePasse, 10);
            const user = { courriel, mdp: hash };
            const doc = await db.collection("utilisateurs").add(user);
            user.id = doc.id;
            user.token = genererToken(user.id);
            res.json(user);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post("/connexion", async (req, res) => {
    try {
        const motDePasse = req.body.mdp;
        const courriel = req.body.courriel;

        const docRef = await db.collection("utilisateurs").where("courriel", "==", courriel).get();
        const utilisateurs = [];

        docRef.forEach(async (doc) => {
            utilisateurs.push({ id: doc.id, ...doc.data() });
        });

        const utilisateur = utilisateurs[0];

        if (utilisateur === undefined) {
            res.statusCode = 400;
            res.json({ message: "Le courriel n'existe pas" });
        } else {
            const resultatConnexion = await bcrypt.compare(motDePasse, utilisateur.mdp);

            if (resultatConnexion) {
                utilisateur.token = genererToken(utilisateur.id);
                res.json(utilisateur);
            } else {
                res.statusCode = 400;
                res.json({ message: "Mot de passe incorrect" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

const genererToken = function (id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
module.exports = router;
