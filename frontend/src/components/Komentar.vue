<template>

<div class="komentar-content container" >

    <form class="form-komentar" @submit.prevent>
        <div class="post-buttons" v-if="!clicked">
            <button class="btn btn-lg btn-primary" @click="clicked = !clicked">
                Dodaj Kometar
            </button>

        </div>

        <div class="dodaj-komentar" v-else>
            <div class="komentar-header shadow-lg">
                <h4 class="komentar-title">
                    Ostavite vaš komentar za {{ restoran.restoran }}
                </h4>
                <small id="komentarError">
                    Polja označena sa * su obavezna polja. Hvala!
                </small>
            </div>
            <!-- <div class="komentar-error mt-3" id="komentarError">
                <h4 class="p-3">
                    Molimo unesite sva polja označena sa *. Hvala!
                </h4>
            </div> -->
            <div class="form-row">

                <div class="form-group">
                    <label for="ime" id="komentarIme">Ime *</label>
                    <input type="text" class="form-input" v-model="komentar.ime">
                    <label for="prezime" id="komentarPrezime" class="mt-2">Prezime *</label>
                    <input type="text" class="form-input" v-model="komentar.prezime" >
                    <label for="rate" id="komentarOcjena" class="mt-2">Ocjena: *</label>
                    <div class="form-data radio-input">
                        <label for="rate">
                            <input type="radio" name="rate" id="rateJedan" v-model="komentar.rate" value="1">
                            <i class="fa-regular fa-face-angry"></i>
                        </label>

                        <label for="rate">
                            <input type="radio" name="rate" id="rateJedan" v-model="komentar.rate" value="2">
                            <i class="fa-regular fa-face-frown-open"></i>
                        </label>

                        <label for="rate">
                            <input type="radio" name="rate" id="rateJedan" v-model="komentar.rate" value="3">
                            <i class="fa-regular fa-face-meh"></i>
                        </label>

                        <label for="rate">
                            <input type="radio" name="rate" id="rateJedan" v-model="komentar.rate" value="4">
                            <i class="fa-regular fa-face-grin"></i>
                        </label>

                        <label for="rate">
                            <input type="radio" name="rate" id="rateJedan" v-model="komentar.rate" value="5">
                            <i class="fa-regular fa-face-grin-hearts"></i>
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="komentar" id="komentarText" class="mt-2">Komentar *: </label>
                    <textarea class="form-input" v-model="komentar.text" name="komentar" id="" cols="30" rows="10"></textarea>
                </div>
            </div>
            <div class="form-buttons">
                <button class="btn btn-warning btn-lg" @click="zatvoriKomentar()">
                    Zatvori
                </button>
                <button class="btn btn-lg btn-primary" @click="postKomentar()">
                    Pošalji
                </button>
            </div>
        </div>

    </form>

</div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
    name: "Komentar",
    data () {
        return {
            komentar: {
                ime: null,
                prezime: null,
                text: null,
                rate: null,
                createdAt: new Date().toLocaleDateString()
            },
            clicked: false
        }
    },
    methods: {
         ...mapActions(['getRestoran']),
        postKomentar() {
            if (!this.komentar.ime || !this.komentar.prezime || !this.komentar.rate || !this.komentar.text) {
                document.getElementById('komentarError').style.color = 'red'
                document.getElementById('komentarIme').style.color = 'red'
                document.getElementById('komentarPrezime').style.color = 'red'
                document.getElementById('komentarOcjena').style.color = 'red'
                document.getElementById('komentar').style.color = 'red'

            } else {
                axios.post(`/api/restoran/${this.restoran._id}/komentar`, {
                    ime: this.komentar.ime,
                    prezime: this.komentar.prezime,
                    rate: this.komentar.rate,
                    komentar: this.komentar.text
                })
                .then( location.reload() )
            }

        },
        zatvoriKomentar() {
            this.komentar.ime = null,
            this.komentar.prezime = null,
            this.komentar.text = null
            this.komentar.rate = null
            this.clicked = false
            document.getElementById('komentarError').style.color = '#182628'
        }
    },
    computed: {
        ...mapGetters(['restoran'])
    },
    created() {
        this.getRestoran()
    }
}
</script>

<style scoped>
.dodaj-komentar {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.post-buttons {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    padding: 1rem;
}
.komentar-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: rgba(244, 211, 73, 0.8);
    color: #000;
    font-weight: bold;
    width: 60%;
}

.dodaj-komentar .form-row {
    flex-direction: column;
    padding: 1rem;
}

.radio-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid #000;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;
}

.radio-input svg {
    height: 30px;
    padding: 0.5rem;
}

.radio-input input[type="radio"] {
    opacity: 0;
    position: absolute;
    width: 50px;
    height: 50px;
    cursor: pointer;

}

.radio-input input[type="radio"] + svg{
    border-radius: 50%;
    color: red;
}

.radio-input input[type="radio"]:checked + svg{
    color: #008000;
}

.form-komentar .form-row {
    width: 60%;
    flex-direction: column;
}

.form-komentar .form-group {
    flex-direction: column;
    display: flex;
}

.form-komentar .form-group label {
    padding: 0.5rem;
}

.form-komentar .radio-input {
    padding: 0.5rem;
    justify-content: space-evenly;
}

.form-komentar .form-buttons {
    justify-content: space-evenly;
}

.komentar-error {
    display: none;
}
.komentar-error h4 {
    color: red;
}

@media screen and (max-width: 349px) {
     .komentar-header {
        width: 100%;
    }   
    .komentar-title {
        font-size: 1em;
    }
    .form-komentar .form-row {
        width: 100%;
        flex-direction: column;
    }
    .form-komentar .form-group label {
        padding: 0;
    }
    .komentar-error h4 {
        width: 100%;
        font-size: 1em;
    }
}

@media screen and (min-width: 350px) and (max-width: 480px) {
    .komentar-header {
        width: 100%;
    }   
    .komentar-title {
        font-size: 1em;
    }
    .form-komentar .form-row {
        width: 100%;
        flex-direction: column;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 767px){    
    .komentar-header {
        width: 100%;
    }
    .form-komentar .form-row {
        width: 100%;
    }
    .form-group {
        margin: 0;
    }
    .komentar-title {
        font-size: 1.2em;
    }
}

@media screen and (min-width: 481px) and (max-width: 767px) and (orientation: landscape) { 
    .komentar-header {
        width: 100%;
    }   
        .form-komentar .form-row {
        width: 100%;
    }
    .komentar-title {
        font-size: 1em;
    }
}
/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 768px) and (max-width: 1023px){ 
    .komentar-header {
        width: 100%;
    } 
    .form-komentar .form-row {
        width: 100%;
    }
    .komentar-title {
        font-size:1em;
    }
}

@media screen and (min-width: 769px) and (max-width: 1023px) and (orientation: landscape) {
    .komentar-header {
        width: 100%;
    }   
    .komentar-title {
        font-size: 1em;
    }
}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 1023px) and (max-width: 1440px) { 

}

</style>