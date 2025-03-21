<template>
  <div>
    <div v-if="userProfile">
      <div>
        <img :src="userProfile.photoProfil" alt="Photo de profil" class="profile-image" />
      </div>
      <div>
        <span class="username">{{ userProfile.nom }} {{ userProfile.prenom }}</span><br>
        <span style="color: black;" class="useremail">{{ userProfile.email }} ({{ userProfile.telephone }})</span>
      </div>
      <div>
        <i style="color: orange;" class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
      </div>
      <i @click="getOut" style="color: red;  margin-top: 2vh; font-size: 20px; font-weight: bold;" class="fa fa-power-off"></i>
     <div>
      <div class="opt">
        <div class="listF"><h4>clients satisfaits:</h4>  <h3>0/10</h3></div>
        <div class="listF"><h4>Clients insatisfaits:</h4>  <h3>0/10</h3></div>
        <div class="listF"><h4>Moyenne</h4>  <h3>0/10</h3></div>
      </div>
      <h2>Solde</h2>
      <h2 style="color: orange;">0,99 FCFA</h2>
     </div>
    </div>
    <div v-else>
      <p>Chargement du profil...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userProfile: null, // Données de l'utilisateur connecté
    };
  },
  mounted() {
    this.fetchUserProfile(); // Récupérer les données au chargement du composant
  },
  methods: {
    getOut(){
      localStorage.removeItem('userProfile');
      this.$router.push('/');
    },
    fetchUserProfile() {
      const userProfile = localStorage.getItem('userProfile');
      if (userProfile) {
        this.userProfile = JSON.parse(userProfile); // Convertir en objet
      } else {
        console.log('Aucun profil utilisateur trouvé.');
      }
    },
  },
};
</script>

<style scoped>
.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
}
.username{
  color: orange;
  font-weight: bold;
  width: 100%;
}
.opt{
  margin-top: 3vh;
  padding: 0;
  width: 100%;
}
.listF h4{
  text-align: left;
  font-size: 26px;
  margin-top: 3vh;
  font-weight: bold;
  width: 60%;
}
.listF h3{
  color: orange;
  font-weight: bold;
  font-size: 26px;
  width: 40%;

}
.listF{
  display: flex;
  justify-content: space-between;
}
</style>