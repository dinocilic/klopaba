<template>
    <div class="prijava-korak-dva">
        <!-- Informacije o lokalu - Klopa.ba -->
        <div class="form-row">
            <div class="form-group">
                <div class="form-label">
                    <label for="lokal">Ime Lokala: *</label>
                    <span class="error-title" v-if="errors.lokalError">
                        <small> {{ errors.lokalError }} </small>
                    </span>
                    <span class="error-title" v-if="errors.lokalZauzet">
                        <small>{{ errors.lokalZauzet }}</small>
                    </span>
                </div>
                <div class="form-data">
                    <input type="text" name="lokal" v-model="this.lokal" @input="validateLokal(this.lokal)" class="form-input" placeholder="Ime Lokala" id="lokalInput">
                </div>
            </div>
            
            <div class="form-group">
                <div class="form-label">
                    <label for="website">Website: </label>
                    <span class="error-title" v-if="errors.websiteError">
                        <small>{{ errors.websiteError }}</small>
                    </span>
                    <span class="opciono" v-else>
                        <small>
                            ( Opciono ) 
                        </small>
                    </span>
                </div>
                <div class="form-data">
                    <input type="url" name="website" v-model="this.website" @input="validateWebsite(this.website)" class="form-input" placeholder="https://example.com" pattern="https?://.*" id="websiteInput" title="Format URL-a: http/s://example.com ili http/s://www.example.com" oninvalid="setCustomValidity('Format URL-a: http/s://example.com ili http/s://www.example.com')" oninput="setCustomValidity('')">
                </div>
            </div>
        </div>

        <!-- Društvene mreže lokala - Klopa.ba -->
        <div class="form-row form-social">

            <div class="form-header">
                <h4 class="form-title">
                   <strong>Društvene Mreže:</strong> 
                </h4>
                <span class="opciono" :class="[errors.drustveneError ? 'error-title': 'preporuceno']"> 
                    <small>
                        Potrebna je min. 1 društvena mreža. Hvala! 
                    </small>
                </span>
            </div>
            
            <div class="form-box">
                <div class="form-group">
                    <div class="form-label">
                        <label for="facebook">Facebook: </label>
                    </div>
                    <div class="form-data">
                        <input type="text" name="facebook" v-model="this.facebook" @input="validateFacebook(this.facebook)" class="form-input" placeholder="https://www.facebook.com/" id="inputFacebook">
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-label">
                        <label for="instagram">Instagram: </label>
                    </div>
                    <div class="form-data">
                        <input type="text" name="instagram" v-model="this.instagram" @input="validateInstagram(this.instagram)" class="form-input" placeholder="https://wwww.instagram.com/" id="inputInstagram">
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="form-label">
                        <label for="twitter">Twitter: </label>
                    </div>
                    <div class="form-data">
                        <input type="text" name="twitter" v-model="this.twitter" @input="validateTwitter(this.twitter)" class="form-input" placeholder="https://www.twitter.com/" id="inputTwitter">
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="form-label">
                        <label for="linkedin">LinkedIn:</label>
                    </div>
                    <div class="form-data">
                        <input type="text" name="linkedin" v-model="this.linkedin" @input="validateLinkedin(this.linkedin)" class="form-input" placeholder="https://www.linkedin.com/" id="inputLinkedin">
                    </div>
                </div>
            </div>
            
        </div>
        
        <!-- Adresa lokala lokala - Klopa.ba -->

        <div class="form-row form-adresa">
            <div class="form-header">
                <h4 class="form-title">
                    <strong>Adresa Lokala: *</strong>
                </h4>
            </div>
            <div class="form-box">
                <div class="form-group">
                    <div class="form-label">
                        <label for="adresa">Ulica: </label>
                        <span class="error-title" v-if="errors.adresaError">
                            <small>
                                {{ errors.adresaError }}
                            </small>
                        </span>
                    </div>
                    <div class="form-data">
                        <input type="text" name="adresa" v-model="this.adresa" @input="validateUlicu(this.adresa)" class="form-input" placeholder="Puni naziv ulice lokala" id="adresaInput">
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-label">
                        <label for="grad">Grad:</label>
                        <span class="error-title" v-if="errors.gradError">
                            <small>
                                {{ errors.gradError }}
                            </small>
                        </span>
                    </div>
                    <div class="form-data">
                        <select v-model="this.grad" @change="validateGrad(this.grad)" name="grad" id="gradId" class="form-input">
                            <option value=""></option>
                            <option v-for="grad in klopaGradovi" :key="grad.id" :value="grad" >{{ grad }}</option>
                        </select>
                    </div>
                </div>
                 <div class="form-group">
                    <div class="form-label">
                        <label for="zip">Zip: </label>
                        <span class="error-title" v-if="errors.zipError">
                            <small>
                                {{ errors.zipError }}
                            </small>
                        </span>
                        <span v-if="errors.neispravanZip" class="error-title">
                            <small>{{ errors.neispravanZip }}</small>
                        </span>
                    </div>
                    <div class="form-data">
                        <input type="text" name="zip" v-model.number="this.zip" @input="validateZip(this.zip)" class="form-input" placeholder="Zip kod grada" id="zipInput">
                    </div>
                </div>
            </div>

        </div>  

        <div class="form-buttons">
            <button class="btn btn-warning btn-lg" @click="this.$store.state.koraci--">
                Nazad
            </button>
            <button class="btn btn-primary btn-lg" @click="goNext">
                Dalje
            </button>
        </div>    
    
    </div>
            

</template>


<script>
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
    name: 'DrugiKorak',
    data() {
        return {
            errors: [],
            klopaGradovi: [],
            restorani: [],
            valid: false
        }
    },
    methods: {
        ...mapMutations(['setGrad', 'setLokal', 'setWebsite', 'setZip', 'setUlicu', 'setFacebook', 'setInstagram', 'setTwitter', 'setLinkedin']),
        validateLokal(lokal) {
            if (!lokal) {
                this.errors['lokalError'] = "Ime lokala je obavezno!"
                document.getElementById('lokalInput').style.border = "2px double red"
                return false
            } else if (this.restorani.includes(lokal.toUpperCase())) {
                this.errors['lokalZauzet'] = "Ime lokala je zauzeto!"
                this.errors['lokalError'] = ''
                document.getElementById('lokalInput').style.border = "2px double red"
                return false
            } else {
                this.errors['lokalError'] = ''
                this.errors['lokalZauzet'] = ''
                document.getElementById('lokalInput').style.border = "2px double #0d6efd"
                return true
            }
        },
        validateGrad(grad) {
            if(!grad) {
                this.errors['gradError'] = "Molimo odaberite Grad!"
                document.getElementById('gradId').style.border = "2px double red"
                return false
            } else {
                this.errors['gradError'] = ''
                document.getElementById('gradId').style.border = "2px double #0d6efd" 
                return true
            }
        },
        validateZip(zip) {
            const re = /^\d{5}$/
            if (!zip) {
                this.errors['zipError'] = "Zip je obavezan!"
                this.errors['neispravanZip'] = ''
                document.getElementById('zipInput').style.border = "2px double red"
                return false
            } else if (!re.test(zip)) {
                this.errors['zipError'] = ""
                this.errors['neispravanZip'] = 'Neispravan Zip Kod!'
                document.getElementById('zipInput').style.border = "2px double red"
                return false
            }  else {
                this.errors['zipError'] = ''
                this.errors['neispravanZip'] = ''
                document.getElementById('zipInput').style.border = "2px double #0d6efd"
                return true
            }
        },
        validateUlicu(adresa) {
            if (!adresa) {
                this.errors['adresaError'] = "Ime ulice je obavezno!"
                document.getElementById('adresaInput').style.border = "2px double red"
                return false
            } else {
                this.errors['adresaError'] = ''
                document.getElementById('adresaInput').style.border = "2px double #0d6efd"
                return true
            }
        },
        validateFacebook(facebook) {
            const reFb = new RegExp(/(http|https?:\/\/)(www\.)?facebook\.com\/[A-Za-z0-9_.]{1,30}\/?/g) // eslint-disable-line
            if(!facebook) {
                this.errors['drustveneError'] = "Potrebna je min. 1 društvena mreža. Hvala!"
                document.getElementById('inputFacebook').style.border = "2px double red"
                document.getElementById('inputInstagram').style.border = "2px double red"
                document.getElementById('inputTwitter').style.border = "2px double red"
                document.getElementById('inputLinkedin').style.border = "2px double red" 
                return false
            } else if (reFb.test(facebook)) {
                document.getElementById('inputFacebook').style.border = "2px double #0d6efd"
                document.getElementById('inputInstagram').style.border = "2px double #0d6efd"
                document.getElementById('inputTwitter').style.border = "2px double #0d6efd"
                document.getElementById('inputLinkedin').style.border = "2px double #0d6efd"
                this.errors['drustveneError'] = ""
                return true
            }
        },
        validateInstagram(instagram) {
            const reInsta = new RegExp(/(http|https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.]{1,30}\/?/g) // eslint-disable-line 
            if(!instagram) {
                this.errors['drustveneError'] = "Potrebna je min. 1 društvena mreža. Hvala!"
                document.getElementById('inputFacebook').style.border = "2px double red"
                document.getElementById('inputInstagram').style.border = "2px double red"
                document.getElementById('inputTwitter').style.border = "2px double red"
                document.getElementById('inputLinkedin').style.border = "2px double red"
                return false
            } else if (reInsta.test(instagram)) {
                document.getElementById('inputFacebook').style.border = "2px double #0d6efd"
                document.getElementById('inputInstagram').style.border = "2px double #0d6efd"
                document.getElementById('inputTwitter').style.border = "2px double #0d6efd"
                document.getElementById('inputLinkedin').style.border = "2px double #0d6efd"
                this.errors['drustveneError'] = ""
                return true
            }
        },
        validateTwitter(twitter) {
            const reTwitter = new RegExp(/(http|https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]{5,15}(\?(\w+=\w+&?)*)?/g) // eslint-disable-line
            if(!twitter) {
                this.errors['drustveneError'] = "Potrebna je min. 1 društvena mreža. Hvala!"
                document.getElementById('inputFacebook').style.border = "2px double red"
                document.getElementById('inputInstagram').style.border = "2px double red"
                document.getElementById('inputTwitter').style.border = "2px double red"
                document.getElementById('inputLinkedin').style.border = "2px double red"
                return false
            } else if (reTwitter.test(twitter)) {
                document.getElementById('inputFacebook').style.border = "2px double #0d6efd"
                document.getElementById('inputInstagram').style.border = "2px double #0d6efd"
                document.getElementById('inputTwitter').style.border = "2px double #0d6efd"
                document.getElementById('inputLinkedin').style.border = "2px double #0d6efd"
                this.errors['drustveneError'] = ""
                return true
            }
        },
        validateLinkedin(linkedin) {
            const reLink = new RegExp(/(ftp|http|https):\/\/?((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/) // eslint-disable-line
            if(!linkedin) {
                this.errors['drustveneError'] = "Potrebna je min. 1 društvena mreža. Hvala!"
                document.getElementById('inputFacebook').style.border = "2px double red"
                document.getElementById('inputInstagram').style.border = "2px double red"
                document.getElementById('inputTwitter').style.border = "2px double red"
                document.getElementById('inputLinkedin').style.border = "2px double red"
                return false
            } else if (reLink.test(linkedin)) {
                document.getElementById('inputFacebook').style.border = "2px double #0d6efd"
                document.getElementById('inputInstagram').style.border = "2px double #0d6efd"
                document.getElementById('inputTwitter').style.border = "2px double #0d6efd"
                document.getElementById('inputLinkedin').style.border = "2px double #0d6efd"
                this.errors['drustveneError'] = ""
                return true
            }
        },
        validateWebsite(website) {
            const reWebsite = new RegExp(/^((ftp|http|https):\/\/).([A-z]+)\.([A-z]{2,})/)
            if (!website) {
                this.errors['websiteError'] = ''
                return true
            } else if (!reWebsite.test(website)) {
                this.errors['websiteError'] = "Pogrešan format URL-a."
                return false
            } else {
                this.errors['websiteError'] = ''
                return true
            }
        },
        goNext() {
            let websiteField = document.getElementById('websiteInput').value

            if (!this.lokal || !this.adresa || !this.grad || !this.zip) {
                this.validateLokal(this.lokal)
                this.validateUlicu(this.adresa)
                this.validateGrad(this.grad)
                this.validateZip(this.zip)
                return false
            } 

            if (!this.validateFacebook(this.facebook) && !this.validateInstagram(this.instagram) && !this.validateTwitter(this.twitter) && !this.validateLinkedin(this.linkedin)) {
                this.validateFacebook(this.facebook)
                this.validateInstagram(this.instagram)
                this.validateTwitter(this.twitter)
                this.validateLinkedin(this.linkedin)
                return false
            } 

            if (websiteField.length > 0 && !this.validateWebsite(this.website)) {
                this.validateWebsite(this.website)
                return false
            }

            if (this.lokal && this.adresa && this.grad && this.zip && this.facebook || this.instagram || this.twitter || this.linkedin) {
                this.$store.state.koraci++
                return true
            }
        },
        async getKlopaGradove() {
            await axios.get('/api/gradovi/svi')
            .then((res) => {
                res.data.filter((item) => {
                    this.klopaGradovi.push(item.ime)
                })
            })
            .catch((err) => {
                console.log(err);
            })
        },
        async getRestorane() {
            await axios.get('/api/gradovi/restorani')
            .then((res) => {
                // console.log(res.data);
                res.data.filter((item) => {
                    // console.log(item.restoran);
                    this.restorani.push(item.restoran.toUpperCase())
                })
            })
            .catch((err) => {
                console.log(err);
            })
        },
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },
    computed: {
        lokal: {
            get() {
                return this.$store.state.form.lokal
            },
            set(value) {
                this.$store.commit('setLokal', this.capitalize(value.trim()))
            }
        },
        website: {
            get() {
                return this.$store.state.form.website
            },
            set(value) {
                this.$store.commit('setWebsite', value)
            }
        },
        grad: {
            get() {
                return this.$store.state.form.grad
            },
            set(value) {
                this.$store.commit('setGrad', value)
            }
        },
        adresa: {
            get() {
                return this.$store.state.form.adresa
            },
            set(value) {
                this.$store.commit('setUlicu', value)
            }
        },
        zip: {
            get() {
                return this.$store.state.form.zip
            },
            set(value) {
                this.$store.commit('setZip', value)
            }
        },
        facebook: {
            get() {
                return this.$store.state.form.facebook
            },
            set(value) {
                this.$store.commit('setFacebook', value)
            }
        },
        instagram: {
            get() {
                return this.$store.state.form.instagram
            },
            set(value) {
                this.$store.commit('setInstagram', value)
            }
        },
        twitter: {
            get() {
                return this.$store.state.form.twitter
            },
            set(value) {
                this.$store.commit('setTwitter', value)
            }
        },
        linkedin: {
            get() {
                return this.$store.state.form.linkedin
            },
            set(value) {
                this.$store.commit('setLinkedin', value)
            }
        }
    },
    created() {
        this.getKlopaGradove()
        this.getRestorane()
    }
}

</script>

<style scoped>
.prijava-korak-dva {
    margin-top: 5%;
    padding: 2rem;
    background-color: #f2d349;
    border: 2px solid #000;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;
}

.form-social, .form-adresa {
    display: flex;
    flex-direction: column;
    margin-top: 5%;
}

.form-box {
    display: flex;
}

.form-social .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media screen and (min-width: 300px) and (max-width: 349px) {
    .form-row {
        flex-direction: column;
    }
    .form-header {
        flex-direction: column;
    }
    .form-box {
        flex-direction: column;
    }
}

@media screen and (min-width: 350px) and (max-width: 480px) {
    .form-row {
        flex-direction: column;
    }
    .form-header {
        margin-top: 5%;
        flex-direction: column;
    }
    .form-box {
        flex-direction: column;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 767px){
        .form-row {
        flex-direction: column;
    }
    .form-header {
        flex-direction: column;
    }
    .form-box {
        flex-direction: column;
    }
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