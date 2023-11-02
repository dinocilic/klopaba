<template>

    <div class="main-content">
        <Navbar />
        
        <Header />

        <div class="klopa-info container" id="oKlopa">
            <div class="row klopa-info-row">
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 klopa-info-div">
                    <div class="klopa-about">
                        <div class="klopa-card">
                            <div class="klopa-card-header">
                                <h4 class="klopa-card-title p-3 text-center">
                                    {{ title }}
                                </h4>
                            </div>
                            <div class="klopa-card-body p-3">
                                <h4 class="klopa-card-title">
                                    Tko smo mi?
                                </h4>
                                <p class="klopa-card-text">
                                    Mi smo tu da vam pomognemo da pronađete najbolji lokal u gradu. 
                                </p>
                                <p class="klopa-card-text">
                                    <strong> {{ title }} </strong> će vam pružiti sve potrebne informacije za dobar provod.
                                </p>
                                <p class="klopa-card-text">
                                    Više o <strong>{{ title }}</strong> možete nači na <router-link :to="{ name: 'onama'}" class="onama-link"><i class="fa-solid fa-hand-point-right"></i> O nama </router-link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 klopa-info-div">
                     <div class="klopa-slika">
                        <img src="../assets/restoran.jpg" alt="Klopa.ba" class="img-fluid">
                     </div>
                </div>
            </div>
        </div>
        <div class="parallax">
            <div class="quote">
                <blockquote class="blockquote shadow p-3" v-for="q in quote.slice(0,1)" :key="q.id">
                    <p class="mb-0">{{ q.text }}</p>
                    <footer class="blockquote-footer mt-2">By <cite title="Source Title"> {{ q.author }} </cite></footer>
                </blockquote>
            </div>
        </div>
        <div class="klopa-glavni-gradovi container" id="glavniGradovi">
            <div class="klopa-header">
                <div class="klopa-header-title">
                    <h1>
                        Klopa u gradovima
                    </h1>
                </div>
                <div class="klopa-header-text-box p-4">
                    <p class="klopa-header-text">
                        Nalazite se u nekom od gradova u BIH? Gladni ste, ali ne znate gdje da jedete?
                    </p>
                    <p class="klopa-header-text">
                        Ne brinite se! Odaberite željeni grad i nađite super lokal za vas. 
                    </p>
                </div>
            </div>

            <div class="klopa-gradovi-div">
                <div class="row">
                    <div class="col-6 col-sm-6 col-lg-3 grad-div" v-for="gradovi in glavniGradovi" :key="gradovi.id">
                        <router-link :to="{ name: 'grad', params: { slug: gradovi.slug } }">
                            <div class="grad-card shadow-lg">
                                <div class="grad-header p-2">
                                    <h4 class="grad-title text-center">
                                        {{ gradovi.ime }}
                                    </h4>
                                </div>
                                <div class="grad-body">
                                    <img :src="require('@/assets/' +  gradovi.ime.split(' ').join('-').toLowerCase() + '.png')" :alt="gradovi.ime" class="grad-img img-fluid">
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

        </div>

        <div class="parallax-2">
            <div class="quote">
                <blockquote class="blockquote shadow p-3" v-for="q in quote.slice(1,2)" :key="q.id">
                    <p class="mb-0">{{ q.text }}</p>
                    <footer class="blockquote-footer mt-2">By <cite title="Source Title"> {{ q.author }} </cite></footer>
                </blockquote>
            </div>
        </div>

        <div class="klopa-ostali-gradovi">
            <div class="klopa-header">
                <div class="klopa-header-title">
                    <h1 class="header-title">
                        Klopa u ostalim gradovima
                    </h1>
                </div>
            </div>

            <div class="klopa-gradovi-div container">
                
                <div class="row">
                    <div class="col-6 col-md-4 col-lg-3 ostali-div" v-for="grad in ostaliGradovi" :key="grad.id">
                        <router-link :to="{ name: 'grad', params: { slug: grad.slug } }" class="shadow-lg">
                            <div class="grad-link">
                                {{ grad.ime }}
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="klopa-ostali-lista">
                <h4 class="ostali-title text-center shadow-lg w-50 p-4">
                    Za pregled svih gradova kliknite 
                    <span>
                        <router-link :to="{ name: 'gradovi'}">ovdje</router-link>
                    </span>
                    <i class="fa-solid fa-hand-point-left"></i>
                </h4>
            </div>
        </div>
        <Footer />
    </div>


</template>

<script>
import Navbar from './Includes/Navbar.vue'
import Header from './Includes/Header.vue'
import Footer from './Includes/Footer.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "Pocetna",
    components: {
        Navbar,
        Footer,
        Header
    },
    data() {
        return {
            title: "Klopa.ba",
            ostGradovi: [],
            pageTitle: "Klopa.ba | Početna | Sve Informacije o lokalima u BIH na jednom mjestu |"
        }
    },
    methods: {
        ...mapActions(['getGlavneGradove', 'getQuotes', 'getOstaleGradove'])
    },
    computed: {
        ...mapGetters(['glavniGradovi', 'quote', 'ostaliGradovi'])
    },
    async created () {
        this.getGlavneGradove()
        await this.getQuotes()
        this.getOstaleGradove()
        document.title = this.pageTitle
    },

}
</script>

<style>
.hide {
    display: none;
}

.row {
    padding: 0;
    margin: 0;
}

.main-content {
    height: 100%;
}

/* Klopa o nama info */
.klopa-info {
    height: 100%;
    display: flex;
}

.klopa-info-row {
    height: 100%;
}

.klopa-info-div {
    height: 100%;
}

.klopa-about, .klopa-slika {
    position: relative;
    top: 25%;
}

.klopa-card .klopa-card-title {
    font-size: 3em;
}

.klopa-card .klopa-card-text {
    font-size: 1.5rem;
    color: #182628;
}

.onama-link {
    color: #182628;
}

/* klopa glavni gradovi */
.klopa-glavni-gradovi {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.klopa-header {
    position: relative;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.klopa-header-title h1 {
    font-size: 3em;
    padding: 0.5em;
    border-bottom: 5px outset #182628;
}

.klopa-header-text {
    font-size: 1.5em;
}

.grad-img {
    display: block;
    margin: auto;
    max-width: 100%;
    height: 250px;
}

.grad-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    background-color: #f2d349;
}

.grad-div a {
    text-decoration: none;
    color: #182628;
}

.grad-div a:hover {
    color: #f2f2f2;
    text-shadow: 2px 2px #182628;
}

.klopa-gradovi-div {
    margin-top: 2%;
}


/* parallax */

.parallax {
    height: 340px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../assets/parallax.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
}

.parallax-2 {
    height: 340px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../assets/parallax-2.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}

.blockquote {
    background-color: #f2f2f2;
    padding: 2em;
    opacity: .8;
    border-top-left-radius: 25px;
    border-bottom-right-radius: 25px;
}

/* klopa ostali gradovi*/
.klopa-ostali-gradovi {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ostali-div a {
    background-color: #f2d349;
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
}

.ostali-div a {
    color: #182628;
    text-decoration: none;
}

.ostali-div a:hover {
    color: #f2f2f2;
    text-shadow: 2px 2px #182628;
}

.grad-link {
    font-size: 1.5em;
    text-align: center;
}

.klopa-ostali-lista {
    width: 60%;
    margin-top: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ostali-title a {
    color: #182628;
}


@media screen and (max-width: 374px) {
    .klopa-info {
        height: auto;
    }
    .klopa-card .klopa-card-title {
        font-size: 2em;
        padding: 0;
    }
    .klopa-card .klopa-card-text {
        font-size: 1.1em;
    }
    .klopa-slika {
        max-width: 90%;
        margin: auto;
        margin-bottom: 2%;
    }
    .klopa-glavni-gradovi {
        height: auto;
    }
    .klopa-header-title h1 {
        font-size: 1.5em;
        text-align: center;
    }
    .klopa-header-text {
        font-size: 1em;
    }
    .klopa-ostali-gradovi {
        position: relative;
        top: 5%;
    }
    .grad-img {
        height: auto;
        width: 100%;
    }
    .grad-div {
        margin-bottom: 10px;
    }
    .grad-header {
        height: 40px;
    }
    .grad-link {
        font-size: 1em;
    }
    .ostali-div a {
        height: 50px;
    }
        .klopa-ostali-lista {
        width: 100%;
    }
    .ostali-title {
        width: 90% !important;
        font-size: 1em;
    }
}

/* even smaller devices  */
@media screen and (min-width: 375px) and (max-width: 480px){
    .klopa-info {
        height: 100vh;
    }
    .klopa-info-div {
        height: 30%;
    }
    .klopa-card .klopa-card-title {
        font-size: 2em;
        padding: 0;
    }
    .klopa-card .klopa-card-text {
        font-size: 1.1em;
    }
    .klopa-about, .klopa-slika {
        top: 20%;
    }
    .klopa-slika {
        max-width: 90%;
        margin: auto;
    }
    .blockquote {
        font-size: 1em;
    }
    .klopa-glavni-gradovi {
        height: auto;
        margin-bottom: 10%;
    }
    .klopa-header-title h1 {
        font-size: 2em;
    }
    .klopa-header-text {
        font-size: 1.1em;
    }
    .grad-header {
        height: 50px;
    }
    .grad-img {
        height: auto;
        width: 100%;
    }
    .grad-div {
        margin-bottom: 10px;
    }
    .klopa-ostali-gradovi {
        height: 100%;
    }
    .klopa-ostali-gradovi .klopa-header-title h1 {
        text-align: center;
        font-size: 1.8em;
    }
    .grad-link {
        font-size: 1.2em;
    }
    .ostali-div a {
        height: 70px;
    }
    .klopa-ostali-lista {
        width: 100%;
    }
    .ostali-title {
        width: 90% !important;
        font-size: 1em;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 768px){ 
    .klopa-info {
        height: 100vh;
    }
    .klopa-info-div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
    }
    .klopa-card .klopa-card-title {
        font-size: 2em;
        padding: 0;
    }
    .klopa-card .klopa-card-text {
        font-size: 1.1em;
    }
    .klopa-slika {
        max-width: 100%;
        margin: auto;
    }
    .klopa-about, .klopa-slika {
        top: 0;
    }
    .klopa-glavni-gradovi {
        height: auto;
        margin-bottom: 5%;
    }
    .grad-div {
        margin-bottom: 10px;
    }
    .klopa-ostali-gradovi {
        height: auto;
        margin-bottom: 5%;
    }
        .klopa-ostali-lista {
        width: 100%;
    }
    .ostali-title {
        width: 90% !important;
        font-size: 1em;
    }
    .klopa-header-text {
        font-size: 1.2em;
    }
    .klopa-header-title h1 {
        font-size: 2em;
    }

 }

 @media screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) { 
    .klopa-info {
        height: auto;
    }
    .klopa-ostali-gradovi {
        height: auto;
    }
    .klopa-slika {
        max-width: 90%;
        margin: auto;
        margin-bottom: 2%;
    }
    .klopa-card {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .klopa-glavni-gradovi {
        height: auto;
    }
    .klopa-header-title h1 {
        font-size: 2em;
    }
    .klopa-header-text {
       font-size: 1.2em; 
    }
    .grad-img {
        height: auto;
        width: 100%;
    }
    .grad-div {
        margin-bottom: 10px;
    }
    .klopa-ostali-gradovi .klopa-header-title h1 {
        text-align: center;
        font-size: 1.8em;
    }
    .grad-link {
        font-size: 1.2em;
    }
    .ostali-div a {
        height: 70px;
    }
    .klopa-ostali-lista {
        width: 100%;
    }
    .ostali-title {
        width: 90% !important;
        font-size: 1em;
    }
    .klopa-ostali-lista {
        margin-bottom: 2%;
    }
    .parallax {
        background-color: #f2d349;
        background-attachment: fixed;
        background-size: cover;
        background-position: top;
    }
}
/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 769px) and (max-width: 1023px){ 
    .klopa-info {
        height: auto;
    }
    .klopa-info-div {
        width: 100%;
    }
    .klopa-slika {
        margin-bottom: 2%;
    }
    .klopa-slika img {
        margin: auto;
        display: block;
        max-width: 80%;
    }
    .klopa-card {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .klopa-card .klopa-card-title {
        font-size: 2em;
        padding: 0;
    }
    .klopa-card .klopa-card-text {
        font-size: 1.1em;
    }
    .klopa-glavni-gradovi {
        height: auto;
    }
    .klopa-header-title h1 {
        font-size: 2em;
    }
    .klopa-header-text {
       font-size: 1.2em; 
    }
    .grad-header {
        height: 50px;
    }
    .grad-img {
        height: auto;
        width: 100%;
    }
    .grad-div {
        margin-bottom: 10px;
    }
    .klopa-ostali-gradovi {
        height: auto;
    }
    .ostali-div a {
        height: 70px;
    }
    .klopa-ostali-lista {
        width: 100%;
        margin-bottom: 2%;
    }
    .ostali-title {
        width: 90% !important;
        font-size: 1em;
    }
 }

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 1023px) and (max-width: 1440px) { 
    .klopa-slika {
        top: 30%;
    }
    .klopa-card .klopa-card-text {
        font-size: 1.2em;
    }
    .klopa-glavni-gradovi {
        height: 100%;
    }
    .grad-img {
        height: 100%;
    }
    .klopa-ostali-lista {
        width: 100%;
    }
}


</style>