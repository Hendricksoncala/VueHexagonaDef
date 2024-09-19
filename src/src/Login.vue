<template>
    <Suspense>
        <template #default>
            <div>

                <div>
                    <header>
                        <div class="header__logo">
                            <img src="./assets/img/Star.svg">
                        </div>
                    </header>
                    <main>
                        <section class="section__form">
                            <h1>Log in</h1>
                            <div class="login">
                                <label for="username">Email address</label>
                                <input v-model="nick" type="text" id="username" placeholder="example@correo.com"
                                    required>
                                <label for="password">Password</label>
                                <input v-model="password" type="password" id="password" placeholder="Your Password">
                                <span>Forgot password?</span>
                                <button @click="handleSubmit" type="button">Iniciar sesión</button>
                            </div>
                        </section>
                        <section>
                            <div class="section__line">
                                <span>Or Login with</span>
                            </div>
                            <div class="section__social">
                                <button><img src="./assets/img/Facebook.svg"></button>
                                <button><img src="./assets/img/Google.svg"></button>
                                <button><img src="./assets/img/Apple.svg"></button>
                            </div>
                        </section>
                    </main>
                    <footer>
                        <router-link to="Register" class=".footer-link" :class="{ active: $route.path === '/register' }">
                            <span :class="{ active: $route.path === '/register' }">Don’t have an account? <b>Sign
                                    up</b></span>
                        </router-link>
                    </footer>
                </div>

            </div>
        </template>
        <template #loading>
            <div>Loading...</div>
        </template>
    </Suspense>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const nick = ref('');
const password = ref('');

const handleSubmit = async () => {
    try {
        console.log(nick.value);
        
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nick: nick.value,
                password: password.value
            })
        });

        if (!response.ok) {
            const data = await response.json();
            alert(data?.message);
            throw new Error(data?.message);
        }

        const data = await response.json();
        alert('Login successful')

        router.push('/products');  // Redireccionar a /productsr

    } catch (error) {
        console.error('User name or Password incorrect:', error);

    }
};

</script>

<style scoped>
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
    /* background: red; */
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
    /* background: red; */
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
.login button,
.section__social button {
    margin-bottom: 22px;
    border: none;
    outline: none;
    /* background: red; */
    border-radius: 10px;
    width: 100%;
    height: 56px;
    font-family: "Inter_18pt-SemiBold";
    font-size: 16px;
}

.login input[type="email"],
.login input[type="password"] {
    border: 1px solid #747474;
    font-family: "Inter_18pt-Regular";
    font-size: 16px;
    padding: 16px 46px 16px 18px;
}

.login span {
    font-size: 14px;
    text-align: right;
    margin-bottom: 38px;
}

.login button[type="button"] {
    background: #000;
    color: #fff;
}

.section__line {
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 22px;
}

.section__line::before,
.section__line::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #D8DADC;
}

.section__line::before {
    margin-right: 10px;
}

.section__line::after {
    margin-left: 10px;
}

.section__social {
    display: flex;
    gap: 15px;
}

.section__social button {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #D8DADC;
    height: 56px;
    background: #fff;
}

footer {
    /* background: red;  */
    text-align: center;
}

.footer-link {
    font-family: "Inter_18pt-SemiBold";
    font-size: 14px;
}


</style>
