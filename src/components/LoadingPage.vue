<template>
  <div class="splash-screen">
    <h1 class="animate__animated animate__fadeInDown">DigitalEvolve <i class="fas fa-laptop-medical"></i></h1>
    <h2 class="animate__animated animate__fadeInUp">Workers</h2>

  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push('/login');
    }, 5000);
  },
};
</script>

<style scoped>
.splash-screen {
  height: 100vh; 
  width: 98%;
  margin-top: 35vh;
}
h1{
  color: orange;
  font-size: 50px;
  width: 100%;
  text-align: center;
  font-family: Montserrat, sans-serif;
  margin-top: 200px;
}
h2{
  color: black;
  font-size: 25px;
  width: 100%;
  text-align: center;
  font-family: Montserrat, sans-serif;
}
</style>