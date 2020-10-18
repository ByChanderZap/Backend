const express = require('express');
const router = express.Router();
const validationHandler = require('../../../utils/middlewares/validationHandler');
const checkAuth = require('../../../utils/middlewares/check-auth');
const controller = require('./controller');
const { 
    nppIdSchema,
    createNewsPapper 
} = require('../../../utils/validation/newsSchema');


router.get('/', async (req, res, next) => {
    try {
        const news = await controller.getAllNews();
        res.status(200).json({
            Message: "Here are the news! 📰",
            news
        })
    } catch (error) {
        next(error);
    }
})

router.post('/', validationHandler(createNewsPapper), checkAuth, async (req, res, next) => {
    const { title, subtitle, articleDate, imageUrl, category, body, journal, scrappingDate, sentiment } = req.body;
    const { userData } = req;

    try {
        const newAdded = await controller.addNew(title, subtitle, articleDate, imageUrl, category, body, journal, scrappingDate, sentiment, userData);
        res.status(200).json({
            Message: "we nurture the world of knowledge! 🧠🧠🧠🧠",
            newAdded
        })
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', validationHandler({id: nppIdSchema}, "params"), checkAuth, async (req, res, next) => {
    const { userData } = req;
    const { id } = req.params;
    try {
        const deleted = await controller.deleteNew(id, userData);
        res.status(200).json({
            Message: "New deleted",
            deleted
        })
    } catch (error) {
        next(error);
    }
})


module.exports = router;