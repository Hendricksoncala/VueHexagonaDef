// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const ProductsController = require('../controllers/productsController.cjs');
const ProductsValidator = require('../validator/productsValidator.cjs');

const router = express.Router();
const productsController = new ProductsController();
const productsValidator = new ProductsValidator();

router.get('/search', (req, res) => productsController.searchProducts(req, res));
router.get('/', (req, res) => productsController.getProducts(req, res));
router.get('/:id', productsValidator.validateProductsId(), (req, res) => productsController.getProductsById(req, res));
router.post('/', productsValidator.validateProductsData(), (req, res) => productsController.createProducts(req, res));
router.put('/:id', productsValidator.validateProductsUpdateDataById(), (req, res) => productsController.updateProducts(req, res));
router.delete('/:id', productsValidator.validateProductsId(), (req, res) => productsController.deleteProducts(req, res));

module.exports = router;