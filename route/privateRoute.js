const express = require('express');
const checkAuth = require("../middleware/checkAuth")

const router = express.Router();

router.post('/private', checkAuth, (req, res) => {
    res.status(200).json("Accès au route privé");
});

module.exports = router;
