// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const ProductsRepository = require('../../domain/repositories/productsRepository.cjs');

class ProductsService {
    constructor() {
        this.productsRepository = new ProductsRepository();
    }

    async getProducts() {
        const Products = await this.productsRepository.getAll();
        if (!Products) {
            throw new Error(JSON.stringify({status: 404, message: 'Products not found'}));
        }
        return Products;
    }

    async getProductsById(id) {
        const Products = await this.productsRepository.getById(id);
        if (!Products) {
            throw new Error(JSON.stringify({status: 404, message: 'Products not found'}));
        }
        return Products;
    }

    async createProducts(data) {
        console.log('bu');
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
        return await this.productsRepository.save(data);
    }

    async updateProducts(id, data) {
        const updatedProducts = await this.productsRepository.updateById(id, data);
        if (!updatedProducts) {
            throw new Error(JSON.stringify({status: 404, message: 'Products not found or could not be updated'}));
        }
        return updatedProducts;
    }

    async deleteProducts(id) {
        const deletedProducts = await this.productsRepository.deleteById(id);
        if (!deletedProducts) {
            throw new Error(JSON.stringify({status: 404, message: 'Products not found or could not be deleted'}));
        }        
        return deletedProducts;
    }
    
    async searchProductssByName(name) {
        return await this.productsRepository.searchByName(name);
    }
}

module.exports = ProductsService;