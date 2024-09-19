<template>
    <Suspense>
        <template #default>
            <div>
                <header>
                    <div class="header__logo">
                        <img src="./assets/img/Star.svg" alt="Logo">
                    </div>
                </header>
                <main>
                    <section class="section__form">
                        <h1>Create account</h1>
                        <form @submit.prevent="handleSubmit" class="login">
                            <label for="username">Username *</label>
                            <input type="text" v-model="form.nick" placeholder="Your username" required>

                            <label for="email">Email *</label>
                            <input type="email" v-model="form.email" placeholder="Your email" required>

                            <label for="password">Password *</label>
                            <input type="password" v-model="form.password" placeholder="Your password" required>

                            <label for="cedula">Cedula</label>
                            <input type="text" v-model="form.cedula" placeholder="Your cedula">

                            <label for="names">Name</label>
                            <input type="text" v-model="form.names" placeholder="Your name">

                            <label for="phone">Phone</label>
                            <input type="text" v-model="form.phone" placeholder="Your phone">

                            <label for="role">Role</label>
                            <select v-model="form.role">
                                <option value="Usuario Estandar" selected>Usuario Estandar</option>
                                <option value="Usuario VIP">Usuario VIP</option>
                                <option value="Administrador">Administrador</option>
                            </select>

                            <span>I accept the terms and privacy policy</span>
                            <input type="submit" value="Create account">
                        </form>
                    </section>
                </main>
                <footer>
                    <router-link to="Login" class=".footer-link" :class="{ active: $route.path === '/register' }">
                        <span :class="{ active: $route.path === '/register' }">Don’t have an account? <b>Sign
                                up</b></span>
                    </router-link>
                </footer>
            </div>
        </template>
        <template #loading>
            <div class="loading-spinner">Loading...</div>
        </template>
    </Suspense>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form state
const form = ref({
    nick: '',
    email: '',
    password: '',
    cedula: '',
    names: '',
    phone: '',
    role: 'Usuario Estandar'
});

const handleSubmit = async () => {
    try {
        const response = await fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form.value) // Enviar los datos del formulario
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData);
            alert(errorData?.errors[0]?.msg);
            throw new Error(errorData || 'Error en la solicitud');
        }

        const data = await response.json();
        console.log('Account created successfully:', data);
        alert('account created')
        router.push('/login')

    } catch (error) {

        console.error('Error al crear la cuenta:', error.message);
        // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
    }
};
</script>

<style scoped>
/* Mantén tu estilo actual */
@import url(./variables.css);

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter_18pt-Regular";
    color: #000;
}

header,
main,
footer {
    margin: 0 20px;
}

header {
    margin-top: 47px;
}

.header__logo {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

main {
    margin-bottom: 50px;
}

.section__form {
    display: flex;
    flex-direction: column;
}

.section__form h1 {
    padding-bottom: 38px;
    font-family: "Inter_18pt-Bold";
    font-size: 30px;
}

.login {
    display: flex;
    flex-direction: column;
}

.login label {
    font-size: 14px;
    padding-bottom: 6px;
}

.login input,
.login select {
    margin-bottom: 22px;
    border: none;
    outline: none;
    border-radius: 10px;
    width: 100%;
    height: 56px;
    font-family: "Inter_18pt-SemiBold";
    font-size: 16px;
}

.login input[type="text"],
.login input[type="email"],
.login input[type="password"],
.login select {
    border: 1px solid #747474;
    font-family: "Inter_18pt-Regular";
    font-size: 16px;
    padding: 16px 18px;
}

.login span {
    font-size: 14px;
    text-align: left;
    margin-bottom: 38px;
}

.login input[type="submit"] {
    background: #000;
    color: #fff;
}

footer {
    text-align: center;
}

.footer-link {
    font-family: "Inter_18pt-SemiBold";
    font-size: 14px;
}

input[type="text"], input[type="email"], input[type="password"] {
    text-transform: none;
}
</style>
