const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Products = require('../models/products')

router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = await Category.create({ name });
        res.json(newCategory);
    } catch (error) {
        res.json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll({ include: [Products] });
        res.json(categories);
    } catch (error) {
        res.json(error);
    }
});

router.put('/:id', async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;
    try {
        const updatedCategory = await Category.update(
            { name },
            { where: { id: categoryId } }
        )
    } catch (error) {
        res.json(error);
    }
});


router.delete('/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
        const deletedCategory = await Category.destroy({ where: { id: categoryId } });
        if (deletedCategory) {
            res.json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;