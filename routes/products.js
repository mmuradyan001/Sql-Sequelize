const express = require('express');
const router = express.Router();
const Product = require('../models/products');

router.post('/', async (req, res) => {
    const { name, price, description, categoryId } = req.body;
    try {
        const newProduct = await Product.create({ name, price, description, categoryId });
        res.json(newProduct);
    } catch (error) {
        res.json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products)
    } catch (error) {
        res.json(error);
    }
});

router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, price, description, categoryId } = req.body;
    try {
        const updateProducts = await Product.update(
            { name, price, description, categoryId },
            { where: { id: productId } }
        );
    } catch (error) {
        res.json(error);
    }
});


router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProducts = await Product.destroy({ where: { id: productId } });
        if (deletedProducts) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.json(error);
    }
});

module.exports = router