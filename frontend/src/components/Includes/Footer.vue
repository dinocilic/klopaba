<template>
        <footer class="footer-content mt-auto">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="footer-info">
                        <h4 class="footer-title">
                            <strong>Klopa.ba</strong>
                        </h4>
                        <img src="@/assets/klopa-logo.png" alt="Klopa.ba | Pronađite najbolji lokal u vašem gradu | Footer Logo" class="footer-logo">
                        <p class="footer-text">
                           <strong>Klopa.ba</strong> znamo gdje želite jesti. <br>
                           Mi pružamo samo najbolje za vas!
                        </p>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 mt-4 mb-4 col-lg-6">
                    <div class="footer-linkovi">
                        <h4 class="footer-title">
                            <strong>Klopa.ba linkovi</strong>
                        </h4>
                        <ul class="nav nav-pills nav-fill shadow p-3">
                            <li class="nav-item">
                                <!-- <router-link :to="{ name: 'pocetna' }" class="nav-link"> Početna </router-link> -->
                                <a :href="$router.resolve({name: 'pocetna'}).href" class="nav-link"> Početna </a>
                            </li>
                            <li class="nav-item">
                                <!-- <router-link :to="{ name: 'onama' }" class="nav-link"> O nama </router-link> -->
                                <a :href="$router.resolve({name: 'onama'}).href" class="nav-link"> O nama </a>
                            </li>
                            <li class="nav-item">
                                <!-- <router-link :to="{ name: 'gradovi' }" class="nav-link"> Gradovi </router-link> -->
                                <a :href="$router.resolve({name: 'gradovi'}).href" class="nav-link"> Gradovi </a>
                            </li>
                            <li class="nav-item">
                                <!-- <router-link :to="{ name: 'kontakt' }" class="nav-link"> Kontakt </router-link> -->
                                <a :href="$router.resolve({name: 'kontakt'}).href" class="nav-link">Kontakt</a>
                            </li>
                        </ul>
                        <a :href="$router.resolve({name: 'prijava'}).href" class="footer-prijava btn btn-lg shadow-lg">
                            Prijavite se na Klopa.ba
                        </a>
                        <hr>
                        <div class="footer-tp">
                            <a :href="$router.resolve({name: 'policy'}).href" class="footer-policy btn-lg shadow-lg">
                                Politika Privatnosti
                            </a>
                            <a :href="$router.resolve({name: 'terms'}).href" class="footer-terms btn-lg shadow-lg">
                                Uvjeti Korištenja
                            </a>
                        </div>
  
                    </div>

                </div>
                <div class="col-12 col-sm-12 col-md-6 mt-4 col-lg-6">
                <div class="footer-social">
                        <h4 class="footer-title text-center">
                            <strong>
                                Pratite nas
                            </strong>
                        </h4>
                        <div class="social-icons">
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
                    <div class="newsletter">
                        <p class="footer-text text-center">
                            <strong>
                                Želite najnovije vijesti sa Klopa.ba. <br>
                                Unesite vaš email i budite dio Klopa svijeta !
                                </strong>  
                            </p>
                            <form class="form" @submit.prevent>
                                <input type="text" v-model="email" name="email" placeholder="Unesite vaš email" class="form-control" id="subsInput">
                                <button type="button" class="btn btn-primary" @click="getSubs()">Upiši se</button>
                            </form>
                    </div>

                </div>
            </div>

            <div class="copyrights">
                <h4>
                    <strong>
                        <i class="fa-solid fa-copyright"></i> Klopa.ba 2022
                    </strong>
                </h4>
            </div>

            <div class="cookies" id="cookies" :class="{'hide': this.storage.getItem('visit') }">
                <div class="cookies-header"> 
                    <h1 class="cookies-title">
                        Kolačići (Cookies)
                    </h1>
                </div>
                <div class="cookies-body">
                    <h4 class="cookies-text">    
                        Ova stranica koristi Kolačiće (cookies) da bi vam omogućili što bolje korištenje naše stranice. 
                    </h4>
                    <button class="btn btn-primary btn-lg" @click="setCookies">Razumijem</button>
                </div>
            </div>

        </footer>
</template>

<script>
import axios from 'axios'

export default {
    name: "Footer",
    data() {
        return {
            email: null,
            storage: localStorage
        }
    },
    methods: {
        getSubs() {
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
            if (!this.email) {
                this.$swal({
                    titleText: "Unesite vaš email.\nHvala",
                    // titleText: "Hvala",
                    confirmButtonText: "Zatvori",
                    confirmButtonColor: "#182628",
                    icon: "error",
                    iconColor: "red",
                    background: "#f2d349"
                })            
            } else if (!re.test(this.email)) {
                this.$swal({
                    titleText: "Pogrešan format email-a\nMolimo unesite validnu email adresu",
                    // titleText: "Hvala",
                    confirmButtonText: "Zatvori",
                    confirmButtonColor: "#182628",
                    icon: "error",
                    iconColor: "red",
                    background: "#f2d349"
                })            
            } else {
                axios.post(`/api/klopaba/subscribed`, {
                    email: this.email
                })
                this.$swal({
                    titleText: "Hvala vam što ste postali dio Klopa.ba svijeta!",
                    // titleText: "Hvala",
                    confirmButtonText: "Zatvori",
                    confirmButtonColor: "#182628",
                    icon: "success",
                    iconColor: "green",
                    background: "#f2f2f2"
                }) 
                this.email = ''
            }

        },
        setCookies() {
            this.$cookies.set("token","GH1.1.1689020474.1484362313", Infinity);
            localStorage.setItem('visit', 'klopabavisit')
            document.getElementById('cookies').style.display = 'none'
        }
    }
}
</script>

<style scoped>

footer {
    background-color: #f2d349;
    color: #182628;
}

.row {
    padding: 0;
    margin: 0%;
}

.footer-content {
    position: absolute;
    width: 100%;
}

.footer-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
}

.footer-title {
    margin-bottom: 2%;
}

.footer-info .footer-logo {
    height: 150px;
    margin-bottom: 2%;
}

.footer-text {
    font-size: 1.2em;
    text-align: center;
    font-weight: bold;
    color: #182628;
}

.footer-linkovi {
    margin-top: 2%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.footer-linkovi ul {
    width: 100%;
}

.footer-linkovi .nav-item {
    background-color: transparent;
    border: none;
    padding: 5px;
}

.footer-linkovi .nav-link {
    color: #182628;
    font-weight: bold;
}

.footer-linkovi .nav-link:hover {
    color: #f2f2f2;
    text-shadow: 2px 2px #182628;
}

.footer-prijava {
    position: relative;
    top: 20px;
    width: 100%;
    padding: 10px;
    font-weight: bold;
}

.footer-prijava:hover {
    background-color: #f4f4f4;
    color: #182628;
}
.footer-tp {
    width: 100%;
    display: flex;
    justify-content: space-evenly;   
}
.footer-policy, .footer-terms {
    position: relative;
    width: 100%;
    top: 20px;
    padding: 10px;
    font-weight: bold;
    color: #182628;
    text-decoration: none;
    text-align: center;
}
.footer-policy {
    margin-right: 5px;
}

.footer-policy:hover, .footer-terms:hover {
    background-color: #f2f2f2;
}

.footer-social {
    margin-top: 2%;
}

.footer-social .social-icons {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 2%;
    width: 20%;
    margin-left: 40%;
}

.footer-social .social-icons svg {
    height: 40px;
}

.footer-social .social-icons .facebook-url {
    color: #4267B2;
    font-size: 2em;
}
.footer-social .social-icons .twitter-url {
    color: #1DA1F2;
}

.footer-social .social-icons .instagram-url {
    color: #C13584;
}

.footer-social .social-icons .linkedin-url {
    color: #0077b5;
}

.newsletter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    align-items: center;
}

.newsletter .form {
    width: 100%;
        display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.newsletter .form-control, .newsletter .btn {
    width: 70%;
}

.copyrights {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 1%;
    margin-bottom: 1%;
}

.cookies {
    width: 100%;
    background-color: #f2f2f2;
    position: fixed;
    bottom: 0;
    opacity: .9;
    padding: 1em;
    z-index: 1;
}
.cookies-body {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

@media screen and (min-width: 200px) and (max-width: 374px) {
    .footer-title {
        margin-top: 2%;
    }
    .footer-text {
        font-size: 1em;
    }
    .newsletter {
        margin-top: 5%;
    }
    .footer-social .social-icons {
        padding: 1em;
    }
    .cookies-body {
        flex-direction: column;
    }
}

/* even smaller devices  */
@media screen and (min-width: 375px) and (max-width: 480px){
    .footer-title {
        margin-top: 2%;
    }
    .footer-text {
        font-size: 1em;
    }
    .newsletter {
        margin-top: 5%;
    }
    .footer-social .social-icons {
        padding: 1em;
    }
    .cookies-body {
        flex-direction: column;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 768px){ 
    .cookies-body {
        flex-direction: column;
    }
}

@media screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) { 
    .newsletter strong {
        font-size: 1em;
    }
}
/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 769px) and (max-width: 1023px){ 
}

/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 769px) and (max-width: 1023px) and (orientation: landscape) { 
    .footer-text {
        font-size: 1em;
    }

}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 1023px) and (max-width: 1440px) { 
}
</style>