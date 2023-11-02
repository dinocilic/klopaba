<template>
    
    <div class="prijava-korak-tri" v-if="!submitted">
        <!-- Opis lokala - Klopa.ba -->
        <div class="form-row form-opis">
            <div class="form-group">
                <div class="form-label">
                    <label for="opis">Opis Lokala: *</label>
                    <div class="label-info">
                        <span class="preporuceno">
                            <small>
                                Max. 1000 riječi
                            </small> 
                        </span>
                        <span class="error-title" v-if="errors.opisError">
                            <small>
                                {{ errors.opisError}}
                            </small>
                        </span>
                    </div>
                </div>
                <div class="form-data">
                    <textarea name="opis" @keyup="countdown" id="inputOpis" v-model="opis" @input="validateOpis(opis)" class="form-input" cols="30" rows="10" placeholder="Opišite Vaš lokal u par rečenica..." maxlength="1000"></textarea>
                    <span class="wordcount-text" :class="{'text-danger': hasError}">
                        <small>
                            Preostale riječi: {{ remainingCount }}
                        </small>
                    </span>
                </div>
            </div>
            <div class="form-group form-slika-group">
                <div class="form-label">
                    <label for="slika">Slika: *</label>
                    <div class="label-info">
                        <span :class="[errors.slikaError ? 'error-title': 'preporuceno']">
                            <small>
                                Potrebna je min. 1 slika. 
                            </small>
                        </span>

                        <span :class="[errors.slikaError ? 'error-title': 'preporuceno']">
                            <small>
                                Format slike: jpeg/jpg/png.
                            </small>
                        </span>
                    </div>

                </div>
                <div class="form-info" >
                    <div class="form-slika"  v-if="this.$store.state.form.slika.url">
                        <img :src="this.$store.state.form.slika.url" :alt="this.$store.state.form.slika.ime" class="img-fluid" >
                        <button class="btn btn-danger clearInput" @click="clearInput">X</button>
                    </div>
                    <div class="form-data" id="dataId">
                        <label id="inputSlika" class="file-input btn-file shadow-lg" v-if="!this.$store.state.form.slika.ime">
                            <input ref="file" type="file" name="slika" accept="image/jpg, image/jpeg, image/png" @change="validateImage($event.target.files[0])"/>                                                
                            <h4>Dodajte sliku... </h4>
                            <span class="preporuceno">
                                <small>
                                    Preporučena veličina slike: 800x600 i max. 2MB
                                </small>
                            </span>
                        </label>

                    </div>

                </div>
            </div>
        </div>

        <div class="form-buttons">
            <button class="btn btn-warning btn-lg" @click="this.$store.state.koraci--">
                Nazad
            </button>
            <button class="btn btn-primary btn-lg" @click="submit">
                Završi
            </button>
        </div>    

    </div>

    <div v-else>
        <Zahvalnica />
    </div>

</template>


<script>
import { mapMutations } from 'vuex'
import Swal from 'sweetalert2'
import Zahvalnica from './Zahvalnica.vue'
import axios from 'axios'

export default {
    name: 'TreciKorak',
    components: {
        Zahvalnica
    },
    data() {
        return {
            hasError: false,
            maxCount: 1000,
            remainingCount: 1000,
            errors: [],
            submitted: false,
            image: null,
        }
    },
    methods: {
        ...mapMutations(['setOpis']),
        countdown() {
            this.remainingCount = this.maxCount - this.opis.length
            this.hasError = this.remainingCount < 0;
            if (this.remainingCount === 0) {
                this.hasError = true
            }
        },
        validateOpis(opis) {
            if (!opis) {
                this.errors['opisError'] = "Opis je obavezan!"
                document.getElementById('inputOpis').style.border = "2px double red"
                return false
            } else {
                this.errors['opisError'] = ""
                document.getElementById('inputOpis').style.border = "2px double #0d6efd" 
                return true   
            }
        },
        validateImage(img) {
            if (!img.name || !img) {
                this.errors['slikaError'] = true
                document.getElementById('inputSlika').style.border = '2px double red'
                return false
            } else if (img.type !== 'image/jpeg' && img.type !== 'image/png' && img.type !== 'image/jpg') {          
                Swal.fire({
                    icon: 'error',
                    background: '#f2d349',
                    color: '#000',
                    confirmButtonText: 'Zatvori',
                    confirmButtonColor: '#0d6efd',
                    title: '<strong>Pogrešan format. </strong>',
                    text: 'Koristite format slike: jpeg/jpg/png.'
                })   
                this.errors['slikaError'] = true
                document.getElementById('inputSlika').style.border = '2px double red'
                this.clearInput()
                return false
            } else { 
                this.errors['slikaError'] = false
                this.$store.state.form.slika.ime = img.name
                this.$store.state.form.slika.size = img.size
                this.$store.state.form.slika.type = img.type
                this.$store.state.form.slika.url = URL.createObjectURL(img)
                return true
            }
        },
        clearInput() {
            let obj = this.$store.state.form.slika
            Object.keys(obj).forEach(v => obj[v] = null)
        },
        submit() {
            if (!this.validateOpis(this.opis) || !this.$store.state.form.slika.url) {
                this.validateImage(this.$store.state.form.slika)
            }
            

            if (this.$store.state.form.slika.url && this.opis) {
                axios.post('/api/klopaba/dodaj', {
                    kontakt_osoba: {
                            ime: this.$store.state.form.ime,
                            prezime: this.$store.state.form.prezime,
                            email: this.$store.state.form.email,
                            telefon: this.$store.state.form.telefon
                        },
                    grad: this.$store.state.form.grad,
                    restoran: this.$store.state.form.lokal,
                    podaci: {
                        adresa: this.$store.state.form.adresa + ", " +this.$store.state.form.zip + " " + this.$store.state.form.grad,
                        kontakt:
                            {
                                broj_telefona: this.$store.state.form.telefon,
                                email: this.$store.state.form.email,
                                url: {
                                    facebook: this.$store.state.form.facebook,
                                    instagram: this.$store.state.form.instagram,
                                    twitter: this.$store.state.form.twitter,
                                    linkedin:this.$store.state.form.linkedin,
                                    website:this.$store.state.form.website
                                }
                            }
                        ,
                        opis: this.$store.state.form.opis,
                        radni_sati: {
                            otvoreno: true,
                            radna_sedmica: [ "ponedjeljak: 07:00 – 23:00", "utorak: 07:00 – 23:00", "srijeda: 07:00 – 23:00", "četvrtak: 07:00 – 23:00", "petak: 07:00 – 23:00", "subota: 07:00 – 23:00", "nedjelja: 07:00 – 23:00"
                            ]
                        }
                    },
                    slug: this.$store.state.form.lokal,
                    aktivni: false,
                    kreirani: true,
                    odbijeni: false,
                    slika:
                        {
                        ime: this.$store.state.form.slika.ime,
                        size: this.$store.state.form.slika.size,
                        type: this.$store.state.form.slika.type,
                        url: this.$store.state.form.slika.url
                        },
                    komentari: [],
                    rating: [0]
                })
                .then((res) => {
                    console.log(res);
                })
                this.submitted = true
                return true
            } else {
                console.log("opet nije popunjeno");
            }
            

        }
    },
    computed: {
        opis: {
            get() {
                return this.$store.state.form.opis
            },
            set(value) {
                this.$store.commit('setOpis', value)
            }
        },
    }
}
</script>

<style scoped>
.prijava-korak-tri {
    margin-top: 5%;
    padding: 2rem;
    background-color: #f2d349;
    border: 2px solid #000;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;
}

.prijava-korak-tri .form-row {
    flex-direction: column;
    align-items: center;
}

.prijava-korak-tri .form-label {
    flex-direction: column;
}

.prijava-korak-tri .label-info {
    display: flex;
    width: 100%;
    justify-content: space-between;
    /* flex-direction: column; */
}

.prijava-korak-tri .form-label label {
    width: 100%;
}

.prijava-korak-tri .label-title {
    display: inherit;
    flex-direction: column;
}

.form-opis .wordcount-text {
    float: right;
}

.form-opis .form-group, .form-slika-row .form-group {
    width: 60%;
}

.file-input input[type="file"] {
    display: none;
}

.file-input {
    width: 400px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /* margin-top: 40px; */
    padding: 0.5rem;
    border: 2px outset #000;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;
}

.file-input p {
    color: #000;
    padding: 0;
    margin: 0;
}

.clearInput {
    position: relative;
    width: 40px;
    height: 40px;
    bottom: 268px;
    left: -2px;
    cursor: pointer;
    margin-top: 10px;
    padding: 0.5rem;
    border: 2px outset #000;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;
}

.form-slika-group .form-data, .form-slika-group .form-info {
    display: flex;
    justify-content: center;
    margin-top: 1%;
}

.form-slika {
    width: 400px;
    height: 250px;
    /* margin-top: 40px; */
    border: 2px solid #000;
    /* background-color: #f4f4f4; */
    border-radius: 10px;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;

}

.form-slika img {
    display: block;
    margin: auto;
    max-width: 100%;
    padding: 0.5rem;
    height: 100%;
}

@media screen and (max-width: 349px) {
    .form-opis .form-group {
        width: 100%;
    }
        .prijava-korak-tri .label-info {
        flex-direction: column;
        align-items: center;
    }
    .preporuceno {
        text-align: center;
    }
        .file-input {
        width: 100%;
    }   
}

@media screen and (min-width: 350px) and (max-width: 480px) {
    .form-opis .form-group {
        width: 100%;
    }
    .file-input {
        width: 100%;
    }
    .prijava-korak-tri .label-info {
        flex-direction: column;
        align-items: center;
    }
    .preporuceno {
        text-align: center;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 767px){
}

@media screen and (min-width: 481px) and (max-width: 767px) and (orientation: landscape) { 

}
/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 768px) and (max-width: 1023px){ 
    .form-label {
        flex-direction: column;
    }
}

@media screen and (min-width: 769px) and (max-width: 1023px) and (orientation: landscape) {

}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 1024px) and (max-width: 1440px) { 

}



</style>