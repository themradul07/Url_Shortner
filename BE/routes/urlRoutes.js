const express =require('express');
const router = express.Router();
const {redirectUrl , shortenUrl} = require('../controllers/urlController');
const Url = require('../models/urlModel');

router.get('/:shortcode', redirectUrl);
router.post('/shorten', shortenUrl);

router.get("/get/all", async (req, res) => {
    try {
        console.log("here");
        
        const urls = await Url.find().sort({ createdAt: -1 });
        res.json(urls);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router;

