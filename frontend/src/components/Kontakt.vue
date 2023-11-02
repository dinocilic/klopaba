<template>
    <div class="kontakt-main">
        <Navbar />


            <div class="kontakt-header">
            </div>

            <div class="kontakt-container container">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="form-header">
                            <h4 class="form-header-title">
                                Ukoliko imate nekih pitanja za nas, javite nam se preko formulara ispod.
                            </h4>
                        </div>
                        <form class="form" ref="form" @submit.prevent>
                            <div class="form-group">
                                <label for="ime" class="form-label">Ime: *</label>
                                <input type="text" v-model="form.ime" class="form-control shadow" placeholder="Vaše ime">
                            </div>
                            <div class="form-group">
                                <label for="prezime" class="form-label">Prezime: *</label>
                                <input type="text" v-model="form.prezime" class="form-control shadow" placeholder="Vaše Prezime">
                            </div>
                            <div class="form-group">
                                <label for="email" class="form-label">Email: *</label>
                                <input type="text" v-model="form.email" class="form-control shadow" placeholder="Vaš Email">
                            </div>
                            <div class="form-group">
                                <label for="poruka" class="form-label">Poruka: *</label>
                                <textarea v-model="form.poruka" id="poruka" cols="30" rows="10" class="form-control shadow"></textarea>
                            </div>
                            <div class="form-buttons">
                                <button class="btn btn-lg btn-primary" @click="sendEmail">Pošalji</button>
                            </div>
                        </form>
                    </div>

                    <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="kontakt-info-image">
                            <img src="@/assets/klopa-logo.png" alt="Klopa.ba | Kontakt Logo" class="kontakt-logo">
                        </div>
                        <div class="kontakt-info-links">
                            <div class="kontakt-email">
                                <h4 class="kontakt-info-title">
                                    <i class="fa-solid fa-at mail-icon" ></i>
                                    <a href="#">
                                        info@klopa.ba 
                                    </a>
                                </h4>

                            </div>
                            <div class="kontakt-lokacija">
                                <h4 class="kontakt-info-title">
                                    <i class="fa-solid fa-map-location"></i>
                                    <a href="#">
                                        Bosna i Hercegovina
                                    </a>
                                </h4>
                            </div>

                        </div>  
                        <div class="kontakt-socijalne">
                            <div class="facebook-icon">
                                <a href="https://www.facebook.com/klopaba.svijet" target="_blank">
                                    <i class="fab fa-facebook facebook-url"></i>
                                </a>
                            </div>
                            <div class="instagram-icon">
                                <a href="https://www.instagram.com/klopaba.svijet/" target="_blank">
                                    <i class="fab fa-instagram instagram-url"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        <Footer />
    </div>
</template>

<script>
import Navbar from '@/components/Includes/Navbar.vue'
import Footer from '@/components/Includes/Footer.vue';
// import emailjs from '@emailjs/browser'
import axios from 'axios'

export default {
    name: "Kontakt",
    components: {
        Navbar,
        Footer
    },
    data() {
        return {
            title: "Klopa.ba",
            form: {
                ime: null,
                prezime: null,
                email: null,
                poruka: null
            }
        }
    },
    methods: {
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
                    poruka: this.form.poruka
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
        document.title = "Klopa.ba | Kontaktirajte nas |"
    }
}
</script>

<style scoped>

.row {
    padding: 0%;
    margin: 0%;
    width: 100%;
}

.main-content {
    height: 100%;
}

.kontakt-box {
    height: 100%;
}

.kontakt-header {
    height: 100vh;
    background: url('../assets/kontaktirajte-nas.png');
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #f2f2f2;

}

.form-msg {
    margin-bottom: 2%;
}

.kontakt-container {
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    margin-bottom: 5%;
    background-color: #f2f2f2;
    border: 2px solid #000;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;
}

.kontakt-info-image img {
    display: block;
    margin: auto;
    max-width: 70%;
}

.kontakt-socijalne {
    display: flex;
    justify-content: space-evenly;
    margin-top: 5%;
    /* width: 50%;
    margin-left: 25%; */
}
.kontakt-socijalne svg, .kontakt-info-links svg {
    height: 50px;
}
.kontakt-info-links {
    margin-left: 25%;
    margin-top: 5%;
}

.kontakt-info-title {
    font-size: 1.5em;
    display: flex;
    align-items: center;

}
.kontakt-info-title a {
    text-decoration: none;
    color: #182628;
}

.kontakt-email svg {
    color: lightcoral;
    margin-right: 25px;
}

.kontakt-telefon svg {
    color: #3498DB;
    margin-right: 25px;
}

.kontakt-lokacija svg {
    color: #3B945E;
    margin-right: 25px;
}

.facebook-icon svg {
    color: #4267B2;
}
.instagram-icon svg {
    color: #C13584;
}
.twitter-icon svg {
    color: #1DA1F2;
}
.linkedin-icon svg {
    color: #0077b5;
}

@media screen and (max-width: 374px) {
    
    .kontakt-header {
        height: 100vh;
    }
    .kontakt-container {
        height: auto;
    }
    .kontakt-container .row {
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .kontakt-info-image {
        margin-top: 10%;
    }
    .kontakt-info-links {
        margin-left: 0%;
    }
    .kontakt-info-title {
        font-size: 1em;
    }
    .kontakt-socijalne {
        margin-top: 10%;
        margin-bottom: 5%;
    }
    .form-header-title {
        font-size: 1em;
    }
}

/* even smaller devices  */
@media screen and (min-width: 375px) and (max-width: 480px){
    .kontakt-header {
        height: 100vh;
    }
    .kontakt-container {
        height: auto;
    }
    .kontakt-container .row {
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .kontakt-info-image {
        margin-top: 10%;
    }
    .kontakt-info-links {
        margin-left: 0%;
    }
    .kontakt-socijalne {
        margin-top: 10%;
        margin-bottom: 5%;
    }
    .form-header-title {
        font-size: 1.2em;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 768px){ 
    .kontakt-header {
        height: 100vh;
    }
    .kontakt-container {
        height: auto;
    }
    .kontakt-container .row {
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .kontakt-info-image {
        margin-top: 5%;
    }
}

@media screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) {
    .kontakt-container {
        height: auto;
    }
    .kontakt-container .row {
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .kontakt-socijalne {
        margin-top: 10%;
        margin-bottom: 5%;    
    }
    .kontakt-info-image {
        margin-top: 5%;
    }
    .kontakt-info-links {
        margin-left: 10%;
    }
    .kontakt-info-image img {
        max-width: 70%;
    }
    .form-header-title {
        font-size: 1em;
    }
}
/* Medium devices (tablets, 76px and up) */
@media screen and (min-width: 769px) and (max-width: 1023px){ 
    .kontakt-header {
        height: 100vh;
    }
    .kontakt-container {
        height: auto;
    }
    .kontakt-container .row {
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .kontakt-info-image {
        margin-top: 5%;
    }

}

@media screen and (min-width: 769px) and (max-width: 1023px) and (orientation: landscape) {
    .kontakt-container {
        height: auto;
    }
    .kontakt-socijalne {
        margin-top: 10%;
        margin-bottom: 5%;   
    }
    .kontakt-info-image {
        margin-top: 5%;
    }
    .kontakt-info-image img {
        max-width: 70%;
    }
    .form-header-title {
        font-size: 1em;
    }
}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 1023px) and (max-width: 1440px) { 
    .kontakt-info-links {
      margin-left: 15%;  
    }

}

</style>