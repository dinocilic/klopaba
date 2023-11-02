<template>
    <Loading v-if="isLoading" />
    <div class="restoran-detaljno" v-else>
        <Navbar />

        <div class="restoran-main">
            <div class="restoran-content container" v-if="restoran.aktivni">
                <button class="btn btn-lg btn-primary restoran-button" @click="$router.go(-1)">
                    Nazad
                </button>
                <div class="restoran-main-header">
                    <h4 class="restoran-main-title" >
                        {{ restoran.restoran }}
                    </h4>
                    <span class="linkovi" v-for="item in restoran.podaci.kontakt" :key="item.id">
                        <span v-if="item.url">
                            <span v-if="item.url.facebook">
                                <a :href="item.url.facebook" target="_blank">
                                    <i class="fab fa-facebook facebook-url"></i>
                                </a>
                            </span>
                            <span v-if="item.url.instagram" >
                                <a :href="item.url.instagram" target="_blank">
                                    <i class="fab fa-instagram instagram-url"></i>
                                </a>
                            </span>
                            <span v-if="item.url.twitter">
                                <a :href="item.url.twitter" target="_blank">
                                    <i class="fab fa-twitter twitter-url"></i>
                                </a>
                            </span>
                            <span v-if="item.url.linkedin">
                                <a :href="item.url.linkedin" target="_blank">
                                    <i class="fab fa-linkedin linkedin-url"></i>
                                </a>
                            </span>
                            <span v-if="item.url.website">
                                <a :href="item.url.website" target="_blank">
                                    <i class="fa-solid fa-globe website-url"></i>
                                </a>
                            </span>
                        </span>
                    </span>
                </div>

                <div class="restoran-main-content" >
                    <div class="main-box-one">
                        <div class="restoran-main-slike">
                            <div class="slika-box">
                                <img :src="'/images/' + restoran.grad.split(' ').join('-').toLowerCase() + '/' + restoran.slug + '.jpg'" :alt="restoran.restoran" class="restoran-slika">
                            </div>
                            <div v-for="slike in restoran.slike" :key="slike.id">
                                <img :src="slike.url" alt="">
                            </div>
                            
                        </div>
                        <div class="restoran-main-info">
                            <div class="restoran-adresa">
                                <i class="fa-solid fa-location-crosshairs"></i>
                                <p class="restoran-text">
                                    <a :href="'https://www.google.com/maps/search/' + restoran.podaci.adresa  + '+' + restoran.restoran" target="_blank">
                                    {{ restoran.podaci.adresa }}
                                    </a> 
                                </p> 
                            </div>
                            <div class="restoran-telefon" v-for="kontakt in restoran.podaci.kontakt" :key="kontakt.id">
                                <i class="fa-solid fa-phone"></i>
                                <p class="restoran-text">
                                   <a href="#">
                                       {{ kontakt.broj_telefona }}
                                    </a> 
                                </p>
                            </div>
                            <div class="restoran-rating">
                                <i class="fas fa-star"></i> 
                                <p class="restoran-text" v-if="restoran.rating">
                                    {{ getAverage(restoran.rating) }}
                                </p>
                            </div>
                            <div class="restoran-radni-sati">
                                <div class="radni-sati-head">
                                    <i class="fa-solid fa-rectangle-list"></i>
                                    <p class="restoran-text">
                                        Radna sedmica: 
                                    </p>
                                </div>
                                <ul class="restoran-lista">
                                    <li class="lista-item" v-for="sati in restoran.podaci.radni_sati.radna_sedmica" :key="sati.id" :class="{'boldiraj': sati.startsWith(getDate()) }">
                                        {{ sati }}
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div class="restoran-opis"> 
                        <div v-if="restoran.podaci.opis">
                            <h4 class="opis-title">
                                Opis restorana: 
                            </h4>
                            <p class="restoran-text" >
                                {{ restoran.podaci.opis }}
                            </p>
                        </div>
                        <div v-else>
                            <h4 class="opis-title">
                                Ovaj lokal nema opisa. 
                            </h4>
                        </div>
                    </div>
                    <div class="vlasnistvo">
                        <router-link :to=" { name: 'kontakt-agenciju'}">
                            <h4 class="text-center">
                                Vlasnik ste lokala {{ restoran.restoran }}? <br>
                                Javite nam se!
                            </h4>
                        </router-link>
                        <!-- Modal -->
                    </div>

                    <Komentar />
                    
                    <Komentari />
        

                </div>
            </div>
        </div>

        <Footer />
    </div>  

</template>

<script>
import Navbar from '@/components/Includes/Navbar.vue';
import Footer from '@/components/Includes/Footer.vue';
import Komentar from '@/components/Komentar.vue'
import Komentari from '@/components/Komentari.vue'
import Loading from '@/components/Loading.vue'

import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
    name: "Detaljno",
    components: {
        Navbar,
        Footer,
        Komentar,
        Komentari,
        Loading
    },
    data() {
        return {
            restoranSlugs: null,
            isLoading: true
        }
    },
    methods: {
        ...mapActions(['getRestoran']),
        getAverage(rate) {
            const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
            const result = average( rate ); // 5  
            return result.toFixed(1);
            // console.log(result);
        },
        getDate() {
            moment.locale('bs')
            return moment().format('dddd');
        },
        async checkUrl() {
            if (!this.restoran.slug || !this.restoran.aktivni) {
                return this.$router.push({ name: 'notfound'})
            }
        }

    },
    computed: {
        ...mapGetters(['restoran']),

        
    },
    async created() {
        await this.getRestoran()
        this.getDate()
        await this.checkUrl()
        document.title = `Klopa.ba | Svi podaci o ${this.restoran.restoran} |`
        setTimeout(() => {
            this.isLoading = false
        }, 2000)
    }

}
</script>

<style scoped>
.restoran-detaljno {
    height: 100%;

}

.restoran-main {
    display: flex;
    height: auto;
    background-size: cover;
}

.restoran-content {
    background-color: #f4f4f4;
    padding: 1rem;
    margin-top: 5%;
    margin-bottom: 5%;
    box-shadow: 0.3rem 0.3rem 1rem rgba(244, 244, 244, 0.5)!important;
}

.restoran-main-header {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 5px double #000;
}

.restoran-main-header svg {
    height: 35px;
    margin-left: 20px;
}

.restoran-main-header .facebook-url {
    color: #4267B2;
}
.restoran-main-header .twitter-url {
    color: #1DA1F2;
}

.restoran-main-header .instagram-url {
    color: #C13584;
}

.restoran-main-header .linkedin-url {
    color: #0077b5; 
}

.restoran-main-header .website-url {
    color: #03a259; 
}

.restoran-main-header .restoran-main-title {
    font-size: 2.5rem;
    padding: 1.2rem;
    text-shadow: 1px 1px #f4f4f4;
}

.restoran-main-content {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
}

.main-box-one {
    display: flex;
    height: auto;
    /* flex-direction: column; */
}

.restoran-main-info {
    padding: 2rem;
}

.restoran-main-info, .restoran-main-slike {
    width: 100%;
}

.restoran-opis {
    padding: 2rem;
    height: auto;
}

.slika-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* margin-top: 6%; */
    padding: 2.5rem;
}

.slika-box img {
    max-width: 100%;
    display: block;
    height: 440px;
    margin: auto;
}

.restoran-main-info svg {
    height: 25px;
    margin: 15px;
}

.restoran-telefon svg {
    color: #3498DB;
}
.restoran-adresa svg {
    color: #008000;
}
.restoran-rating svg {
    color: lightcoral;
}
.restoran-radni-sati svg {
    color: #000;
}

.restoran-text {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 15px;
    font-size: 14px;
    word-break: break-all;
    font-weight: bold;
    color: #000;
}

.restoran-adresa, .restoran-telefon, .restoran-rating {
    display: flex;
    align-items: center;
    border: 5px outset #000;
    margin: 5px;
    box-shadow: 0.3rem 0.3rem 1rem rgba(242, 211, 73, 0.8)!important;
}
.restoran-adresa a, .restoran-telefon a {
    text-decoration: none;
    color: #000;
}

.restoran-radni-sati  {
    display: flex;
    flex-direction: column;
    border: 5px outset #000;
    margin: 5px;
    box-shadow: 0.3rem 0.3rem 1rem rgba(242, 211, 73, 0.8)!important;
}

.radni-sati-head {
    display: flex;
    align-items: center;
}

.restoran-lista {
    list-style: none;
    letter-spacing: 1px;
}

.restoran-lista .lista-item {
    font-size: 14px;
}

.vlasnistvo {
    padding: 2rem;
    display: flex;
    justify-content: center;
}

@media screen and (max-width: 349px) {
    .restoran-content {
        margin-top: 20%;
    }
    .restoran-main-header {
        margin-top: 5%;
        flex-direction: column;
    }
    .restoran-main-header .restoran-main-title {
        font-size: 1.2em;   
    }
    .main-box-one {
        flex-direction: column;
    }
    .slika-box img {
        border: 2px outset #000;
        max-width: 100%;
        display: block;
        margin: auto;
        height: 100%;
    }
    .restoran-adresa {
        flex-direction: column;
        padding: 10px;
    }
    .vlasnistvo h4 {
        font-size: 1em;
    }
    .komentar-header {
        width: 100%;
    }
    .form-komentar .form-row {
        flex-direction: column;
    }
    .restoran-main-info {
        padding: 0;
    }
    .slika-box {
        padding: 0.5em;
    }
    .restoran-opis {
        margin-top: 5%;
        padding: 0.5em;
    }
}

@media screen and (min-width: 350px) and (max-width: 480px) {
    .restoran-content {
        margin-top: 20%;
    }
    .restoran-main-header {
        margin-top: 2%;
        flex-direction: column;
    }
    .restoran-main-header .restoran-main-title {
        font-size: 1.2em;   
    }
    .main-box-one {
        flex-direction: column;
    }
    .slika-box img {
        border: 2px outset #000;
        max-width: 100%;
        display: block;
        margin: auto;
        height: auto;
    }
    .restoran-adresa {
        flex-direction: column;
        padding: 5px;
    }
    .vlasnistvo h4 {
        font-size: 1em;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 767px){
    .restoran-content {
        margin-top: 20%;
    }
    .restoran-main-header {
        margin-top: 2%;
    }
    .restoran-main-header .restoran-main-title {
        font-size: 1.2em;   
    }
    .main-box-one {
        flex-direction: column;
    }
    .slika-box img {
        border: 2px outset #000;
        max-width: 100%;
        display: block;
        margin: auto;
        height: auto;
    }
    .restoran-adresa {
        flex-direction: column;
        padding: 5px;
    }
    .vlasnistvo h4 {
        font-size: 1em;
    }
}

@media screen and (min-width: 481px) and (max-width: 767px) and (orientation: landscape) { 
    .restoran-content {
        margin-top: 20%;
    }
    .restoran-main-header {
        margin-top: 2%;
    }
    .restoran-main-header .restoran-main-title {
        font-size: 1.2em;   
    }
    .main-box-one {
        flex-direction: column;
    }
    .slika-box img {
        border: 2px outset #000;
        max-width: 100%;
        display: block;
        margin: auto;
        height: auto;
    }

    .vlasnistvo h4 {
        font-size: 1em;
    }
}
/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 768px) and (max-width: 1023px){ 
    .restoran-content {
        margin-top: 20%;
    }
    .restoran-main-header {
        margin-top: 2%;
    }
    .restoran-main-header .restoran-main-title {
        font-size: 1.2em;   
    }
    .main-box-one {
        flex-direction: column;
    }
    .slika-box img {
        border: 2px outset #000;
        max-width: 100%;
        display: block;
        margin: auto;
        height: auto;
    }
    .vlasnistvo h4 {
        font-size: 1em;
    }
}

@media screen and (min-width: 769px) and (max-width: 1023px) and (orientation: landscape) {
   .restoran-content {
        margin-top: 20%;
    }
}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 1024px) and (max-width: 1440px) { 
   .restoran-content {
        margin-top: 20%;
    }
}


</style>
