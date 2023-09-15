<template>
  <main>
    <h1>Login</h1>
    <form>
      <label for="country_code">Email</label>
      <input type="text" /><br /><br />
      <NuxtLink to="/home"> Sign in </NuxtLink>
      <button @click="login">Login</button>
    </form>
  </main>
</template>

<script>
import VueCookies from "vue-cookies";
export default {
  methods: {
    async login() {
      await $cookies.set("accessTokenCookie", 123123123213);
      this.$router.push({
        path: "/home",
        name: "home",
        component: "pages/home.vue",
      });
    },
  },
};
</script>
