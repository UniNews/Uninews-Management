<template>
  <div>
    <Header />
    <div>
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/partials/Foorter";
import Header from "./components/partials/Header";

export default {
  name: "app",
  components: { Footer, Header }
};
</script>

<style>
</style>