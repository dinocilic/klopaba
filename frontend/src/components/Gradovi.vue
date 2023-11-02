<template>
    <Loading v-if="isLoading"/>

    <div class="gradovi-main" v-else>
        <Navbar />
        <!-- Random restoran na Klopa.ba -->
        <div class="random-restorani container">
            <div class="random-header shadow-lg">
                <h4 class="random-title">
                    Klopa izbor za vas
                </h4>
            </div>
            <div class="random-content">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-4 col-lg-4 random-divs" v-for="restoran in randomRestorani" :key="restoran.id">
                        <div class="random-card shadow-lg" v-if="restoran.aktivni">
                            <div class="random-restoran-image">
                                <img :src="'/images/' + restoran.grad.split(' ').join('-').toLowerCase() + '/' + restoran.slug + '.jpg'" :alt="restoran.restoran" class="restoran-slika">
                            </div>
                            <div class="random-card-body">
                                <router-link :to="{ name: 'detaljno', params: { slug: restoran.slug }}" class="random-card-link">
                                    <div class="random-card-header">
                                        <h4 class="random-card-title">
                                            {{ restoran.restoran }}
                                        </h4>
                                    </div>
                                </router-link>
                                <div class="random-card-main">
                                    <p class="random-card-text">
                                        {{ restoran.podaci.adresa}}
                                    </p>
                                </div>
                                <div class="socijalna-lista" v-for="item in restoran.podaci.kontakt" :key="item.id">
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
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="pointer-content" id="pointer-arrow" >
               <a href="#gradoviId" class="pointer-down">
                   <i class="fa-solid fa-angles-down"></i>
                </a> 
            </div>
        </div>

        <div class="parallax"></div>

        <!-- Svi gradovi na Klopa.ba -->
        <div class="klopa-gradovi container" id="gradoviId">

            <div class="klopa-header">
                <h4 class="klopa-header-title">
                    Odaberite grad koji želite i pronađite lokal za vas.
                </h4>
            </div>

            <div class="row klopa-gradovi-row" >
                <div class="col-4 col-sm-4 col-md-2 col-lg-2 klopa-gradovi-div" v-for="grad in sviGradovi" :key="grad.id" >
                    <router-link :to="{ name: 'grad', params: {slug: grad.slug} }" class="shadow-lg klopa-gradovi-link">
                        <h4 class="klopa-gradovi-title">
                            {{ grad.ime }}
                        </h4>
                    </router-link>
                </div>
            </div>


        </div>

        <Footer />
    </div>
    
</template>

<script>
import Navbar from '@/components/Includes/Navbar.vue';
import Footer from '@/components/Includes/Footer.vue';
import Loading from '@/components/Loading.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "Gradovi",
    components: {
        Navbar,
        Footer,
        Loading
    },
    data() {
        return {
            isLoading: true
        }
    },
    methods: {
        ...mapActions(['getGradove', 'getRandomRestorane'])
    },
    computed: {
        ...mapGetters(['sviGradovi', 'randomRestorani']),
    },
    created() {
        this.getGradove()
        this.getRandomRestorane()
        document.title = "Klopa.ba | Svi gradovi na jednom mjestu | Pronađite vaš grad |"
        setTimeout(() => {
            this.isLoading = false
        }, 2000)
    }
}
</script>   

<style scoped>
.gradovi-main {
    height: 100%;
}
.random-restorani {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.random-header {
    display: flex;
    align-items: center ;
    justify-content: center;
    padding: 2em;
    background-color: #f2d349;
    margin-top: 2%;
    margin-bottom: 2%;
}

.random-title {
    font-size: 2.5em;

}

.random-restoran-image img {
    max-width: 100%;
    display: block;
    margin: auto;
    height: 30vh;
    /* width: 100%; */
}

.random-card-body {
    background-color: #f2d349;
}

.random-card-link {
    text-decoration: none;
    color: #182628;
    font-size: 1em;
}

.random-card-title, .random-card-main {
    height:80px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.random-card-body:hover a {
    text-shadow: 2px 2px #f2f2f2;
}

.socijalna-lista {
    display: flex;
    justify-content: space-evenly;
    
}

.socijalna-lista span {
    margin-bottom: 5%;
}

.socijalna-lista svg {
    height: 30px;
}

.facebook-url {
    color: #4267B2;
}

.instagram-url {
    color: #C13584;
}

.twitter-url {
    color: #1DA1F2;
}

.linkedin-url {
    color: #0077b5;
}

.pointer-content a {
    top: 90%;
}

/* Gradovi */
.klopa-gradovi {
    height: 100%;
}

.klopa-gradovi .row {
    display: flex;
    justify-content: center;
}

.klopa-header {
    display: flex;
    align-items: center ;
    justify-content: center;
    padding: 2em;
    background-color: #f2d349;
    margin-top: 2%;
    margin-bottom: 2%;
}

.klopa-header h4 {
    font-size: 2.5em;
}
.klopa-gradovi-link {
    background-color: #f2d349;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.klopa-gradovi-div a {
    text-decoration: none;
    color: #182628;
}

.klopa-gradovi-title {
    font-size: 1.3em;
}

@media screen and (max-width: 374px) {
    .random-restorani {
        height: auto;
    }
    .random-title {
        font-size: 1.5em;
    }
    .random-header {
        margin-top: 20%;
    }
    .random-divs {
        padding-bottom: 1em;
    }
    .klopa-gradovi {
        height: auto;
    }
    .klopa-header h4 {
        font-size: 1.2em;
    }
    .klopa-gradovi-title {
        font-size: 0.9em;
        text-align: center;
    }
    .klopa-gradovi-div {
        padding: .5em;
    }
    .klopa-gradovi-link {
        height: 80px;
    }
    .klopa-gradovi-row {
        margin-bottom: 2%;
    }
    .pointer-down {
        position: relative;
    }
    .pointer-down svg {
        height: 50px;
    }
    .random-restoran-image img {
        height: 200px;
    }
    .random-card-text {
        font-size: 0.9em;
    }
}

/* even smaller devices  */
@media screen and (min-width: 375px) and (max-width: 480px){
    .random-restorani {
        height: auto;
    }
    .random-title {
        font-size: 2em;
    }
    .random-header {
        margin-top: 20%;
    }
    .random-divs {
        padding-bottom: 1em;
    }
    .klopa-gradovi {
        height: auto;
    }
    .klopa-header h4 {
        font-size: 1.5em;
    }
    .klopa-gradovi-title {
        font-size: 1em;
        text-align: center;
    }
    .klopa-gradovi-div {
        padding: .5em;
    }
    .klopa-gradovi-link {
        height: 80px;
    }
    .klopa-gradovi-row {
        margin-bottom: 2%;
    }
    .pointer-down {
        position: relative;
    }
    .pointer-down svg {
        height: 50px;
    }

}
/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 767px){
    .random-restorani {
        height: auto;
    }
    .random-title {
        font-size: 2em;
    }
    .random-header {
        margin-top: 20%;
    }
    .random-divs {
        padding-bottom: 1em;
    }
        .pointer-down {
        position: relative;
    }
    .pointer-down svg {
        height: 50px;
    }
        .klopa-gradovi {
        height: auto;
    }
    .klopa-header h4 {
        font-size: 1.5em;
    }
    .klopa-gradovi-title {
        font-size: 1em;
        text-align: center;
    }
    .klopa-gradovi-div {
        padding: .5em;
    }
    .klopa-gradovi-link {
        height: 80px;
    }
    .klopa-gradovi-row {
        margin-bottom: 2%;
    }
}

@media screen and (min-width: 481px) and (max-width: 767px) and (orientation: landscape) { 
    .random-header {
        margin-top: 20%;
    }
    .random-restorani {
        height: auto;
    }
        .random-divs {
        padding-bottom: 1em;
    }
        .pointer-down {
        position: relative;
    }
    .pointer-down svg {
        height: 50px;
    }
        .klopa-gradovi {
        height: auto;
    }
    .klopa-gradovi-row {
        margin-bottom: 2%;
    }   
    .klopa-header h4 {
        font-size: 1.5em;
    }
    .klopa-gradovi-title {
        font-size: 1em;
        text-align: center;
    }
}
/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 768px) and (max-width: 1023px){ 
    .random-card-title {
        font-size: .9em;
    }
    .random-card-text {
        font-size: .9em;
    }
    .klopa-gradovi-div {
        height: 80px;
        margin-bottom: 2%;
    }
    .klopa-gradovi-title {
        font-size: 1em;
        text-align: center;
    }
    .klopa-header h4 {
        font-size: 1.5em;
    }
    .random-restoran-image img {
        height: 20vh;
    }
}

@media screen and (min-width: 769px) and (max-width: 1023px) and (orientation: landscape) {
    .random-header {
        margin-top: 20%;
    }
    .random-restorani {
        height: auto;
    }
        .random-divs {
        padding-bottom: 1em;
    }
        .pointer-down {
        position: relative;
    }
    .pointer-down svg {
        height: 50px;
    }
        .klopa-gradovi {
        height: auto;
    }
    .klopa-gradovi-row {
        margin-bottom: 2%;
    }   
    .klopa-header h4 {
        font-size: 1.5em;
    }
    .klopa-gradovi-title {
        font-size: 1em;
        text-align: center;
    }
}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 1023px) and (max-width: 1440px) { 
}

</style>

