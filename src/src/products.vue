<template>
    <Suspense>
        <template #default>
            <div>
                <span class="message">Hexagonal by express</span>
                <div class="container">
                    <div class="admin-product-form-container">
                        <div id="myForm">
                            <form @submit.prevent="addOrupdateProduct">
                                <h3>{{ isEditing ? 'Edit product' : 'Add a new product' }}</h3>
                                <!-- Cambia el título del formulario dependiendo del estado -->
                                <input type="text" placeholder="Enter the name of product" v-model="name" class="box" />
                                <input type="number" placeholder="Enter the price" v-model="price" class="box" />
                                <input type="file" accept="image/png, image/jpeg, image/jpg" @change="handleFileUpload"
                                    class="box" />
                                <input type="submit" class="btn" value="Send" />
                            </form>
                        </div>
                    </div>
                    <div class="product-display">
                        <table class="product-display-table">
                            <thead>
                                <tr>
                                    <td>Image</td>
                                    <td>No</td>
                                    <td>Name</td>
                                    <td>Precio</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody id="myTbody">
                                <tr v-for="(product, index) in products" :key="index">
                                    <td><img :src="product.imageUrl" height="100" alt="Product Image"></td>
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ product.name }}</td>
                                    <td>{{ product.price }}</td>
                                    <td>
                                        <a href="#" class="btn" @click.prevent="editProduct(product)"> edit </a>
                                        <a href="#" class="btn" @click.prevent="deleteProduct(product._id)"> delete </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </template>
        <template #loading>
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </template>
    </Suspense>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const products = ref([]);

// Variables reactivas para el formulario
const name = ref('');
const price = ref(0);
const productImage = ref(null);
const isEditing = ref(false); // Bandera para saber si estamos editando
const editingProductId = ref(null); // Guardar el ID del producto que estamos editando

const fetchProducts = async () => {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        products.value = data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchProducts();
        console.log('Product deleted successfully');
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

// Función para manejar la creación o actualización
const addOrupdateProduct = async () => {
    const productData = {
        name: name.value,
        price: price.value,
        // Aquí puedes agregar el manejo de imágenes
    };

    try {
        if (isEditing.value && editingProductId.value) {
            // Si esta editando, hacer una solicitud PUT ;)
            const response = await fetch(`/api/products/${editingProductId.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Product updated successfully');
        } else {
            // Si esta creando, hacer una solicitud POST ;)
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Product added successfully');
        }

        // Después de la acción, restablecemos el formulario
        resetForm();
        fetchProducts();
    } catch (error) {
        console.error('Error saving product:', error);
    }
};

// Función para editar un producto
const editProduct = (product) => {
    name.value = product.name;
    price.value = product.price;
    editingProductId.value = product._id; // Guardar el ID del producto
    isEditing.value = true; // Cambiar a modo edición
};

// Función para resetear el formulario
const resetForm = () => {
    name.value = '';
    price.value = 0;
    productImage.value = null;
    isEditing.value = false;
    editingProductId.value = null;
};

onMounted(() => {
    fetchProducts();
});
</script>


<style>
:root {
    --green: #27ae60;
    --black: #333;
    --white: #fff;
    --bg-color: #eee;
    --box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .1);
    --border: .1rem solid var(--black);
}

* {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
    text-decoration: none;
}

html {
    font-size: 62.5%;
    overflow-x: hidden;
}

.btn {
    display: block;
    width: 100%;
    cursor: pointer;
    border-radius: .5rem;
    margin-top: 1rem;
    font-size: 1.7rem;
    padding: 1rem 3rem;
    background: var(--green);
    color: var(--white);
    text-align: center;
}

.btn:hover {
    background: var(--black);
}

.message {
    display: block;
    background: var(--bg-color);
    padding: 1.5rem 1rem;
    font-size: 2rem;
    color: var(--black);
    margin-bottom: 2rem;
    text-align: center;
}

.container {
    display: flex;
    justify-content: space-around;
}

.admin-product-form-container.centered {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

}

.admin-product-form-container form {
    max-width: 50rem;
    padding: 2rem;
    border-radius: .5rem;
    background: var(--bg-color);
}

.admin-product-form-container form h3 {
    text-transform: uppercase;
    color: var(--black);
    margin-bottom: 1rem;
    text-align: center;
    font-size: 2.5rem;
}

.admin-product-form-container form .box {
    width: 100%;
    border-radius: .5rem;
    padding: 1.2rem 1.5rem;
    font-size: 1.7rem;
    margin: 1rem 0;
    background: var(--white);
    text-transform: none;
}

.product-display {
    /* margin: 2rem 0; */
    width: 65%;
    height: 85svh;
    overflow-y: auto;
}

.product-display .product-display-table {
    width: 100%;
    text-align: center;
}

.product-display .product-display-table thead {
    background: var(--bg-color);
}

.product-display .product-display-table th {
    padding: 1rem;
    font-size: 2rem;
}


.product-display .product-display-table td {
    padding: 1rem;
    font-size: 2rem;
    border-bottom: var(--border);
}

.product-display .product-display-table .btn:first-child {
    margin-top: 0;
}

.product-display .product-display-table .btn:last-child {
    background: crimson;
}

.product-display .product-display-table .btn:last-child:hover {
    background: var(--black);
}

@media (max-width:991px) {

    html {
        font-size: 55%;
    }

}

@media (max-width:768px) {
    .container {
        flex-direction: column;
        align-items: center;
    }

    .product-display {
        margin-top: 2rem;
        width: 100%;
        height: 100svh;
        overflow-y: scroll;
    }

}

@media (max-width:450px) {

    html {
        font-size: 50%;
    }

    .product-display .product-display-table {
        width: 80rem;
    }
}
</style>
