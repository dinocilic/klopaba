<template>
  <div class="kontakt-agenciju">
    <Navbar />
            <div class="kontakt-main">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-3 kontakt-podaci">
                        <div class="kontakt-podaci-content shadow-lg">
                            <div class="kontakt-podaci-header">
                                <h1 class="text-center">
                                    Klopa.ba
                                </h1>
                            </div>
                            <div class="kontakt-podaci-main">
                                <h5 class="kontakt-podaci-text">
                                    Znate li da je prijava vašeg lokala na Klopa.ba besplatna?
                                </h5>
                                <h5 class="kontakt-podaci-text">
                                    Klopa.ba može vam pomoći da privučete više mušterija iz BIH i šire.
                                </h5>
                                <h5 class="kontakt-podaci-text">
                                    Prijavu vašeg lokala na Klopa.ba možete ostvariti preko prijave na <router-link :to="{name: 'prijava'}">Prijava</router-link>.
                                </h5>
                                <h5 class="kontakt-podaci-text">
                                    Također nam se možete javiti preko naše kontakt forme na <router-link :to="{name: 'kontakt'}">Kontakt</router-link>.
                                </h5>
                            </div>
                            <div class="kontakt-podaci-image">
                                <img src="../assets/klopa-reklama-sitting.png" alt="Klopa.ba | Druženje uz dobru klopu |" class="img-fluid">
                            </div>
                        </div>

                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-6 kontakt-upit">
                        <div class="kontakt-header">
                            <h1 class="text-center shadow-lg">
                                Pošaljite upit za {{ restoran.restoran }}
                            </h1>
                        </div>
                        <form class="form" ref="form" @submit.prevent="sendEmail">
                            <input type="text" name="user_lokal" :value=restoran.restoran style="display:none;">
                            <div class="form-group">
                                <label for="ime">Ime: *</label>
                                <input type="text" v-model="form.ime" class="form-control shadow">
                            </div> 
                            <div class="form-group">
                                <label for="prezime">Prezime: *</label>
                                <input type="text" v-model="form.prezime" name="user_prezime" class="form-control shadow">
                            </div> 
                            <div class="form-group">
                                <label for="email">Email: *</label>
                                <input type="text" name="user_email" v-model="form.email" class="form-control shadow">
                            </div> 
                            <div class="form-group">
                                <label for="poruka">Poruka: *</label>
                                <textarea name="user_poruka" v-model="form.poruka" id="poruka" class="form-control shadow" cols="30" rows="10"></textarea>
                            </div> 
                            <div class="form-group form-buttons mt-2 mb-2">
                                <button class="btn btn-primary" type="submit">
                                    Pošalji
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Includes/Navbar.vue';
import Footer from '@/components/Includes/Footer.vue';
import axios from 'axios'

export default {
    name: "kontaktAgenciju",
    components: {
        Navbar,
        Footer
    },
    data() {
        return {
            restoran: [],
            form: {
                ime: null,
                prezime: null,
                email: null,
                poruka: null,
                restoran: this.$route.params.slug.split('-').join(' ').toUpperCase()
            }
        }
    },
    methods: {
        getKontaktRestoran() {
            axios.get(`/api/kontakt/${this.$route.params.slug}`)
            .then(res => this.restoran = res.data)
        },
        sendEmail() {
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
            if (!this.form.ime || !this.form.prezime || !this.form.email || !this.form.poruka ) {
                this.$swal({
                    titleText: "Ispunite sve podatke označene sa *\nHvala",
                    // titleText: "Hvala",
                    confirmButtonText: "Zatvori",
                    confirmButtonColor: "#182628",
                    icon: "error",
                    iconColor: "red",
                    background: "#f2d349"
                })
            } else if (!re.test(this.form.email)) {
                this.$swal({
                    titleText: "Pogrešan format email-a\nMolimo unesite validnu email adresu.",
                    // titleText: "Hvala",
                    confirmButtonText: "Zatvori",
                    confirmButtonColor: "#182628",
                    icon: "warning",
                    iconColor: "darkorange",
                    background: "#f2d349"

                })  
            } else {
                axios.post('/api/klopaba/kontakt-form', {
                    ime: this.form.ime,
                    prezime: this.form.prezime,
                    email: this.form.email,
                    poruka: this.form.poruka,
                    restoran: this.form.restoran
                })
                .then((res) => {
                    console.log(res);
                })
                this.$swal({
                    titleText: "Uspješno ste poslali poruku.\nUskoro ćemo vam se javiti.",
                    // titleText: "Hvala",
                    confirmButtonText: "Zatvori",
                    confirmButtonColor: "#182628",
                    icon: "success",
                    iconColor: "green",
                    background: "#f2f2f2"

                }) 
                this.form.ime = ''
                this.form.prezime = ''
                this.form.email = ''
                this.form.poruka = ''
            }
        }
    },
    created() {
        this.getKontaktRestoran()
    }
}
</script>

<style scoped>

.kontakt-agenciju {
    height: auto;
}

.kontakt-main {
    padding-top: 150px;
    height: 100%;
    margin-bottom: 5%;
}

.kontakt-header {
    display: flex;
    justify-content: center;
}

.kontakt-header h1 {
    width: 100%;
    background-color: #f2d349;
    padding: 1em;
}

.form-group {
    margin: 0;
}

.form-group label {
    margin-top: 2%;
    margin-bottom: 2%;
}
.kontakt-podaci-content {
    background-color: #f2d349;
}

.btn {
    margin-top: 2%;
    width: 30%;
    height: 50px;
    float: right;
}

.kontakt-podaci {
    display: flex;
    flex-direction: column;
    align-items: center;
    
}

.kontakt-podaci-main, .kontakt-podaci-header {
    padding: 1.2em;
}

.kontakt-podaci-text {
    margin-top: 5%;
    margin-bottom: 5%;
    text-align: center;
    color: #182628;
}

.kontakt-podaci-image img {
    display: block;
    margin: auto;
    max-width: 100%;
}

.kontakt-upit {
    margin-left: 10%;
}


@media screen and (max-width: 349px) {
    .kontakt-upit {
        margin-left: 0;
    }
}

@media screen and (min-width: 350px) and (max-width: 480px) {
    .kontakt-upit {
        margin-top: 5%;
        margin-left: 0;
    }
}


/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 767px){
    .kontakt-upit {
        margin-top: 5%;
        margin-left: 0;
    }
    .kontakt-podaci-text {
        margin-bottom: 2%;
        margin-top: 2%;    
    }
}

@media screen and (min-width: 481px) and (max-width: 767px) and (orientation: landscape) { 
        .kontakt-upit {
        margin-top: 5%;
        margin-left: 0;
    }
        .kontakt-podaci-text {
        margin-bottom: 2%;
        margin-top: 2%;    
    }
 
}
/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 768px) and (max-width: 1023px){ 
    .kontakt-upit {
        margin-top: 5%;
        margin-left: 0;
    }
     .kontakt-podaci-text {
        margin-bottom: 2%;
        margin-top: 2%;
    }
}

@media screen and (min-width: 769px) and (max-width: 1023px) and (orientation: landscape) {
}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 1024px) and (max-width: 1440px) { 
}


</style>