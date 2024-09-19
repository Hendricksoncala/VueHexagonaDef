<template>
    <Suspense>
        <template #default>
            <div class="main">

                <section class="section__imagen">
                    <div class="section__container">
                        <img src="./assets/img/Star.svg">
                    </div>
                    <div class="section__text">
                        <h1>Explore the app</h1>
                        <small>Now your finances are in one place and always under control</small>
                    </div>
                </section>
                <section class="section__button">

                    <router-link to="Login" class="button primary_button" :class="{ active: $route.path === '/login' }">
                        <span :class="{ active: $route.path === '/login' }" class="!text-white">Sing In</span>
                    </router-link>

                    <router-link to="Register" class="button second_button" :class="{ active: $route.path === '/register' }">
                        <span :class="{ active: $route.path === '/register' }">Create Acount</span>
                    </router-link>
                </section>
            </div>
        </template>
        <template #fallback>
            <div>Loading...</div>
        </template>
    </Suspense>
</template>

<script setup>
import { initFlowbite } from 'flowbite'

const goToLogin = () => {

}

</script>



<style scoped>
@import url(./variables.css);

* {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
    font-family: "Inter_18pt-Regular";
    color: #000;
}

.main {
    padding-top: 50px;
    margin: 0 37px;
}

.section__imagen,
.section__button {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section__container {
    padding-bottom: 67px;
}

.section__text {
    text-align: center;
}

.section__text h1 {
    font-family: "Inter_18pt-Bold";
    font-size: 32px;
    padding-bottom: 11px;
}

.section__text small {
    font-size: 17px;
}

.section__button {
    margin-top: 76px;
    gap: 14px;
}

.button {
    border: none;
    outline: none;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: red; */
    border-radius: 10px;
    width: 100%;
    height: 56px;
    font-family: "Inter_18pt-SemiBold";
    font-size: 16px;
}

.primary_button {
    background: #000;
    color: #fff;
}

.second_button {
    background: #fff;
    border: 1px solid #747474;
    color: #000;
}
</style>
