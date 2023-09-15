<template>
  <div>
    <nav>
      <NuxtLink to="/home"> Home page </NuxtLink>
      <NuxtLink to="/fun"> Fun page </NuxtLink>
      <NuxtLink to="/mountains"> Mountains page </NuxtLink>
      <NuxtLink to="/select-mountains"> Select Mountains </NuxtLink>
      <NuxtLink to="/dog"> Dog </NuxtLink>
      <NuxtLink to="/selector-page"> Selector Page </NuxtLink>
    </nav>
    <br />
    <Nuxt />
    <br /><br />
    <footer>
      <button @click="logout">Logout</button>
    </footer>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
export default {
  name: "custom",
  middleware: "authenticated",
  methods: {
    async logout() {
      await $cookies.remove("accessTokenCookie");
      this.$router.push({
        path: "/login",
        name: "login",
        component: "pages/login/index.vue",
      });
    },
  },
};
</script>

<style>
nav {
  display: flex;
  gap: 10px;
}
</style>
