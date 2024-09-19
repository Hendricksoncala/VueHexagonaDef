// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require('express-validator');
const ProductsService = require('../services/productsService.cjs');

class ProductsController {
    constructor() {
        this.productsService = new ProductsService();
    }

    async getProducts(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const products = await this.productsService.getProducts();
            res.status(200).json(products);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getProductsById(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const products = await this.productsService.getProductsById(req.params.id);
            res.status(200).json(products);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createProducts(req, res) {
        try {
            console.log('bu');
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const products = await this.productsService.createProducts(req.body);
            res.status(201).json(products);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updateProducts(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const products = await this.productsService.updateProducts(req.params.id, req.body);
            res.status(200).json(products);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteProducts(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const products = await this.productsService.deleteProducts(req.params.id);
            // Este código indica que la solicitud fue exitosa y que el recurso ha sido eliminado, pero no hay contenido adicional para enviar en la respuesta.
            res.status(204).json(products);
            // En algunos casos, 200 OK también puede ser utilizado si la respuesta incluye información adicional o confirmación sobre la eliminación. Sin embargo, 204 No Content es la opción más estándar para indicar que un recurso ha sido eliminado y no hay contenido adicional en la respuesta.
            // res.status(200).json(products);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
        
    }
    
    async searchProducts(req, res) {
        try {
            const productss = await this.productsService.searchProductssByName(req.query.name);
            res.json(productss);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ProductsController;