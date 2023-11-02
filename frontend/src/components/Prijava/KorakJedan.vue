<template>

    <div class="prijava-korak-jedan">
        <div class="form-row">
            <div class="form-group">
                <div class="form-label">
                    <label for="ime">Ime: *</label>
                    <span class="error-title" v-if="errors.imeError">
                        <small>{{ errors.imeError }}</small>
                    </span>
                </div>
                <div class="form-data">
                    <input type="text" name="ime" v-model="this.ime" @input="validateIme(this.ime)" class="form-input" placeholder="Vaše Ime" id="imeInput">
                </div>
            </div>

            <div class="form-group">
                <div class="form-label">
                    <label for="prezime">Prezime: *</label>
                    <span class="error-title" v-if="errors.prezimeError">
                        <small>{{ errors.prezimeError }}</small>
                    </span>

                </div>
                <div class="form-data">
                    <input type="text" class="form-input" @input="validatePrezime(this.prezime)" v-model="this.prezime" name="prezime"  placeholder="Vaše Prezime" id="prezimeInput">
                </div>
            </div>

        </div>

        <div class="form-row">

            <div class="form-group">
                <div class="form-label">
                    <label for="email">Email: *</label>
                    <span class="error-title" v-if="errors.emailError">
                        <small>{{ errors.emailError }}</small>
                    </span>
                    <span class="error-title" v-if="errors.nijeValidan">
                        <small>{{ errors.nijeValidan }}</small>
                    </span>
                </div>
                <div class="form-data">
                    <input type="email" class="form-input" name="email" @input="validateEmail(this.email)"  v-model="this.email" placeholder="Vaš Email" id="emailInput">
                </div>
            </div>

            <div class="form-group">
                <div class="form-label">
                    <label for="telefon">Broj Telefona: *</label>
                    <span class="error-title" v-if="errors.telefonError">
                        <small>{{ errors.telefonError }}</small>
                    </span>
                    <span class="error-title" v-if="errors.telefonErrorFormat">
                        <small>{{ errors.telefonErrorFormat }}</small>
                    </span>
                </div>
                <div class="form-data">
                    <input type="text" class="form-input" name="telefon" @input="validateTelefon(this.telefon)" v-model="this.telefon" placeholder="Vaš Broj Telefona ex. 061234567" id="telefonInput">
                </div>
            </div>
            
        </div>

        <div class="form-buttons">
            <button class="btn btn-primary btn-lg" @click="goNext">
                Dalje
            </button>
        </div>

    </div>


</template>


<script>
import { mapMutations } from 'vuex'

export default {
    name: "KorakJedan",
    data() {
        return {
            errors: []
        }
    },
    methods: {
        ...mapMutations(['setIme', 'setPrezime', 'setEmail', 'setTelefon']),
        validateIme(ime) {
            if (!ime) {
                this.errors['imeError'] = "Unesite Vaše Ime !"
                document.getElementById('imeInput').style.border = "2px double red"
                return false
            } else {
                this.errors['imeError']  = ''
                document.getElementById('imeInput').style.border = "2px solid #0d6efd"
                return true
            }
        },
        validatePrezime(prezime) {
            if (!prezime) {
                this.errors['prezimeError'] = "Unesite Vaše Prezime !"
                document.getElementById('prezimeInput').style.border = "2px double red"
                return false
            } else {
                this.errors['prezimeError']  = ''
                document.getElementById('prezimeInput').style.border = "2px double #0d6efd"
                return true
            }
        },
        validateEmail(email) {
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
            if (!email) {
                this.errors['emailError'] = "Molimo unesite Vaš Email!"
                this.errors['nijeValidan'] = ''
                document.getElementById('emailInput').style.border = "2px double red"
                return false
            } else if (!re.test(email)) {
                this.errors['nijeValidan'] = "Vaš email nije validan! Molimo unesite validan email!"
                this.errors['emailError'] = ''
                document.getElementById('emailInput').style.border = "2px double red"
                return false
            } else {
                this.errors['nijeValidan'] = ''
                this.errors['emailError'] = ''
                document.getElementById('emailInput').style.border = "2px double #0d6efd"
                return true
            }
        },
        validateTelefon(telefon) {
            var re = /^[\+]?[(]?[0-9]{3,6}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im //eslint-disable-line
            if(!telefon) {
                this.errors['telefonError'] = "Molimo unesite Vaš Broj Telefona!"
                this.errors['telefonErrorFormat']  = ''
                document.getElementById('telefonInput').style.border = "2px double red"
                return false
            } else if (!re.test(telefon)) {
                this.errors['telefonErrorFormat'] = "Pogrešan format broja!"
                this.errors['telefonError'] = ''
                document.getElementById('telefonInput').style.border = "2px double red"
                return false
            } else {
                this.errors['telefonError'] = ""
                this.errors['telefonErrorFormat'] = ''
                document.getElementById('telefonInput').style.border = "2px double #0d6efd"
                return true       
            }
        },
        validateKorak() {
            if (!this.ime || !this.prezime || !this.email || !this.telefon) {
                this.validateIme(this.ime)
                this.validatePrezime(this.prezime)
                this.validateEmail(this.email)
                this.validateTelefon(this.telefon)
                return false
            }
            return true
        },
        goNext() {
            if (!this.validateKorak()) {
                return false
            } else {
                this.$store.state.koraci++
            }
        },
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },
    computed: {
        ime: {
            get() {
                return this.$store.state.form.ime
            },
            set(value) {
                this.$store.commit('setIme', this.capitalize(value.trim()))
            }
        },
        prezime: {
            get() {
                return this.$store.state.form.prezime
            },
            set(value) {
                this.$store.commit('setPrezime', this.capitalize(value.trim()))
            }
        },
        email: {
            get() {
                return this.$store.state.form.email
            },
            set(value) {
                this.$store.commit('setEmail', value)
            }
        },
        telefon: {
            get() {
                return this.$store.state.form.telefon
            },
            set(value) {
                this.$store.commit('setTelefon', value)
            }
        },
    }
}
</script>

<style scoped>
.prijava-korak-jedan {
    margin-top: 5%;
    padding: 2rem;
    background-color: #f2d349;
    border: 2px solid #000;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;
}


#imeInput, #prezimeInput {
    text-transform: capitalize;
}

@media screen and (max-width: 349px) {
    .form-row {
        flex-direction: column;
    }
    .form-label {
        flex-direction: column;
    }
}

@media screen and (min-width: 350px) and (max-width: 480px) {
    .form-row {
        flex-direction: column;
    }
    .form-label {
        flex-direction: column;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 767px){
    .form-row {
        flex-direction: column;
    }
    .form-label {
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