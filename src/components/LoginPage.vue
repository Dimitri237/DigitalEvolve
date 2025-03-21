<template>
    <div class="container monda-font">
        <nav>
            <img src="" alt="" />
        </nav>
        <div>
            <h2 style="font-size: 65px;" class="monda-font"><i class="fas fa-key"></i></h2>
        </div>
        <form @submit.prevent="login">
            <div class="input-field">
                <div><label for="email">Téléphone/Email</label></div>
                <input id="contact" v-model="email" required>
            </div>
            <div class="input-field">
                <div><label for="password">Mot de passe</label></div>
                <input type="password" id="password" v-model="password" required>
            </div>
            <div>
                <button class="download-button" type="submit" :disabled="loading">
                    <span class="loading-indicator" v-if="loading"></span>
                    <span v-else>Connexion</span>
                </button>
                <p> Vous n'avez pas de compte ? <a style="color: orange; font-weight: bold;"
                        @click="SignPage">S'enregistrer</a> </p>
                <p style="color: red; font-style: italic;" v-if="errorMessage">{{ errorMessage }}</p>
            </div>
        </form>
    </div>
</template>

<script>
import { firestore } from '../firebaseConfig';
import { getDocs, collection, query, where } from 'firebase/firestore';
import bcryptjs from 'bcryptjs';

export default {
    data() {
        return {
            email: '',
            password: '',
            loading: false,
            errorMessage: '', // Pour afficher les messages d'erreur
        };
    },

    methods: {
        SignPage() {
            this.$router.push('/Enregistrer');
        },

        async login() {
            this.loading = true;
            this.errorMessage = ''; // Réinitialiser le message d'erreur

            // Recherche de l'utilisateur correspondant à l'email fourni dans Firestore
            const usersRef = collection(firestore, 'users');
            const q = query(usersRef, where('email', '==', this.email));

            try {
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    // L'utilisateur n'a pas été trouvé
                    this.errorMessage = "L'utilisateur n'existe pas.";
                } else {
                    // L'utilisateur a été trouvé, vérification du mot de passe
                    const user = querySnapshot.docs[0].data();
                    if (bcryptjs.compareSync(this.password, user.password)) {
                        // Mot de passe correct, connexion de l'utilisateur
                        localStorage.setItem('isAuthenticated', true);
                        localStorage.setItem('userId', user._id); // Stocker l'ID de l'utilisateur
                        localStorage.setItem('userProfile', JSON.stringify(user)); // Stocker les données de l'utilisateur

                        // Rediriger vers la page d'accueil
                        this.$router.push('/home');
                    } else {
                        // Mot de passe incorrect
                        this.errorMessage = 'Mot de passe incorrect.';
                    }
                }
            } catch (error) {
                // Gérer les erreurs lors de la connexion de l'utilisateur
                console.error("Erreur lors de la recherche de l'utilisateur : ", error);
                this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
<style scoped>
:root {
    --primary-color: orange;
    --secondary-color: #f0f8ff;
    --background-color: #f9f9f9;
    --text-color: #333;
    --hover-color: #45a049;
    --disabled-color: #cccccc;
    --border-color: #ddd;
    --shadow-color: rgba(0, 0, 0, 0.1);
}

.download-button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: orange;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

h2 {
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    color: orange;
}

.stext {
    color: rgba(0, 0, 0, 0.2);
    font-size: 13px;
    margin-top: -20px;
}

.container {
    text-align: left;
    width: 100%;
    margin: auto;
    /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2) !important; */
    /* padding: 15px; */
    margin-top: 10vh;
}

form {
    width: 90%;
    margin: auto;
    margin-top: 20px;
}

.monda-font {
    font-family: 'Monda', sans-serif;
}

input {
    width: 98%;
    height: 30px;
    background: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    outline: none;
    margin-top: 5px;

}

.input-field {
    margin-bottom: 15px;
}

input {
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    width: 100%;
    margin-bottom: 10px;
}

input:nth-child(2) {
    margin-bottom: 20px;
}

label {
    font-weight: 700;
    font-size: 16px;
    color: rgba(6, 40, 61, 0.555)
}

.mot {
    color: rgba(6, 40, 61, 1);
    font-weight: 500;
    font-size: 15px;
}


.pas {
    font-weight: 700;
    color: rgba(6, 40, 61, 1);
    font-size: 14px;
}

.pas a {
    text-decoration: none;
    color: rgb(214, 106, 5);
}

.loading-indicator::after {
    content: "";
    display: inline-block;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    border: 3px solid white;
    border-top-color: #007A5E;
    border-bottom-color: #007A5E;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-indicator {
    display: flex;
    justify-content: center;
    height: 23px;
}
</style>