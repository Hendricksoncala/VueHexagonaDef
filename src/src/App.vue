<template>
  <Suspense>
      <template #default>
          <section
              class="bg-slate-50 dark:bg-backgrond dark:text-white font-semibold h-screen w-screen overflow-x-hidden pb-28">
              <router-view></router-view>
          </section>
      </template>
      <template #fallback>
          <div>Loading...</div>
      </template>
  </Suspense>
</template>

<script setup>
import { initFlowbite } from 'flowbite'

</script>

<style scoped></style>