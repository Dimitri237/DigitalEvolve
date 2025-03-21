<template>
    <div class="container">
        <h1>Création de Compte</h1>
        <form @submit.prevent="createAccount" class="account-form">
            <div class="form-group">
                <label>Nom:</label>
                <input type="text" v-model="form.nom" required class="form-input">
            </div>
            <div class="form-group">
                <label>Prénom:</label>
                <input type="text" v-model="form.prenom" required class="form-input">
            </div>
            <div class="form-group">
                <label>Sexe:</label>
                <select v-model="form.sexe" required class="form-input">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label>Date de naissance:</label>
                <input type="date" v-model="form.dateNaissance" required class="form-input">
            </div>
            <div class="form-group">
                <label>Lieu de naissance:</label>
                <input type="text" v-model="form.lieuNaissance" required class="form-input">
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" v-model="form.email" required class="form-input">
            </div>
            <div class="form-group">
                <label>Telephone:</label>
                <input type="" v-model="form.telephone" required class="form-input">
            </div>
            <div class="form-group">
                <label>Localisation:</label>
                <input type="text" v-model="form.localisation" required class="form-input">
            </div>
            <div class="form-group">
                <label>Dernier diplôme obtenu:</label>
                <input type="text" v-model="form.diplome" required class="form-input">
            </div>
            <div class="form-group">
                <label>Langues parlées:</label>
                <input type="text" v-model="form.langues" required class="form-input">
            </div>
            <div class="form-group">
                <label>Photo de profil:</label>
                <input type="file" @change="handleFileUpload" required class="form-input">
            </div>
            <div class="form-group">
                <label>Bio:</label>
                <textarea v-model="form.bio" required class="form-input"></textarea>
            </div>
            <div class="form-group">
                <label>Mot de passe:</label>
                <input type="password" v-model="form.password" required class="form-input">
            </div>
            <button type="submit" class="submit-button" :disabled="loading">
                {{ loading ? 'Création en cours...' : 'Créer le compte' }}
            </button>
            <p> Vous avez un compte ? <a style="color: orange; font-weight: bold;"
                @click="logPage">Se connecter</a> </p>
        </form>
    </div>
</template>

<script>
import { firestore } from '../firebaseConfig'; // Importez Firebase Firestore
import { setDoc, doc } from 'firebase/firestore';
import bcryptjs from 'bcryptjs'; // Pour le hachage du mot de passe
import { v4 as uuidv4 } from 'uuid'; // Pour générer un ID unique
import moment from 'moment'; // Pour la date de création

export default {
    data() {
        return {
            form: {
                nom: '',
                prenom: '',
                sexe: '',
                dateNaissance: '',
                lieuNaissance: '',
                telephone: '',
                localisation: '',
                diplome: '',
                email: '',
                langues: '',
                photoProfil: null, // Fichier image
                bio: '',
                password: ''
            },
            loading: false // État de chargement
        };
    },
    methods: {
        // Gérer le téléversement de l'image et la convertir en base64
        handleFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                this.form.photoProfil = e.target.result; // Stocker l'image en base64
            };
            reader.readAsDataURL(file); // Convertir l'image en base64
        },
        logPage() {
            this.$router.push('/login');
        },
        // Créer le compte
        async createAccount() {
            this.loading = true; // Activer l'état de chargement

            try {
                // Hacher le mot de passe
                const saltRounds = 10;
                const hashedPassword = bcryptjs.hashSync(this.form.password, saltRounds);

                // Créer l'objet utilisateur
                const user = {
                    _id: uuidv4(), // ID unique
                    nom: this.form.nom,
                    prenom: this.form.prenom,
                    sexe: this.form.sexe,
                    dateNaissance: this.form.dateNaissance,
                    email: this.form.email,
                    telephone: this.form.telephone,
                    lieuNaissance: this.form.lieuNaissance,
                    localisation: this.form.localisation,
                    diplome: this.form.diplome,
                    langues: this.form.langues,
                    photoProfil: this.form.photoProfil, // Image en base64
                    bio: this.form.bio,
                    password: hashedPassword,
                    createdAt: moment().format() // Date de création
                };

                // Enregistrer dans Firestore
                await setDoc(doc(firestore, 'users', user._id), user);

                // Rediriger après la création
                this.$router.push('/login');
            } catch (error) {
                console.error("Erreur lors de la création du compte : ", error);
            } finally {
                this.loading = false; // Désactiver l'état de chargement
            }
        }
    }
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

.submit-button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: orange;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

h1 {
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    color: orange;
}

.container {
    text-align: left;
    width: 100%;
    margin: auto;
    /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2) !important; */
    /* padding: 15px; */
    margin-top: 1vh;
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
    border: none;
    background: transparent;
    outline: none;
    margin-top: 5px;

}

.form-group {
    margin-bottom: 15px;
}

input {
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
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