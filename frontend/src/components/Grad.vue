<template>
    <Loading v-if="isLoading"/>
    
    <div class="grad-content" v-else>
        <Navbar />

        <!-- Random lokal na Klopa.ba -->
        <div class="random-restoran">

            <div class="restoran-header container">
                <h4 class="restoran-header-title">
                    <strong>Klopa.ba</strong> izbor za vas u {{ this.slug }}
                </h4>
            </div>

            <div v-for="restoran in randomRestoran" :key="restoran.id" class="container">

                    <router-link v-if="restoran.aktivni" :to="{ name: 'detaljno', params: { slug: restoran.slug } }" class="restoran-link">
                        <div class="restoran-card">
                            <div class="restoran-image">
                                <img :src="'/images/' + restoran.grad.split(' ').join('-').toLowerCase() + '/' + restoran.slug + '.jpg'" :alt="restoran.restoran" class="restoran-slika">
                            </div>
                            <div class="restoran-body">
                                <div class="restoran-title">
                                    <i class="far fa-address-card"></i> 
                                    <p class="restoran-text">{{ restoran.restoran }}</p> 
                                </div>
                                <div class="restoran-adresa">
                                    <i class="fa-solid fa-map-location"></i>
                                    <p class="restoran-text">{{ restoran.podaci.adresa }}</p>  
                                </div>
                                <div class="restoran-rating" v-if="restoran.rating">
                                    <i class="fas fa-star"></i> 
                                    <p class="restoran-text">{{ getAverage(restoran.rating) }}</p>  
                                </div>
    
                            </div>
                        </div>
                    </router-link>
        
            </div>
        </div>
        <div class="parallax"></div>


        <!-- Lista svih lokala u gradu | Klopa.ba -->
        <div class="restorani-main" id="restoranLista">

            <div class="restoran-header container">
                <h4 class="restoran-header-title">
                    Najbolji lokali u gradu {{ this.slug }}
                </h4>
            </div>

            <div class="search-bar container">
                <nav class="navbar navbar-light p-2">
                    <form class="form search-form" @submit.prevent>
                        <input class="form-control mr-sm-2" v-model="searchValue" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn search-btn" type="submit">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </nav>
            </div>

            <div class="container klopa-top" v-if="filtered">
                <div v-for="item in filtered.slice(0,10)" :key="item.id">
                        <router-link :to="{ name: 'detaljno', params: { slug: item.slug } }" class="restoran-link">
                            <div class="restoran-card">
                                <div class="restoran-image">
                                    <img :src="'/images/' + item.grad.split(' ').join('-').toLowerCase() + '/' + item.slug + '.jpg'" :alt="item.restoran" class="restoran-slika">
                                </div>
                                <div class="restoran-body">
                                    <div class="restoran-title">
                                        <i class="far fa-address-card"></i> 
                                        <p class="restoran-text">
                                            {{ item.restoran }}
                                        </p>
                                    </div>
                                    <div class="restoran-adresa">
                                        <i class="fa-solid fa-map-location"></i>
                                        <p class="restoran-text">
                                            {{ item.podaci.adresa }}
                                        </p>
                                    </div>
                                    <div class="restoran-rating" v-if="item.rating">
                                        <i class="fas fa-star"></i> 
                                        <p class="restoran-text">
                                            {{ getAverage(item.rating) }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                </div>
            </div>
            <div class="restoran-reklama container">
                <div class="reklama-info">
                    <h2 class="reklama-title p-3">
                        Da li želite da se i vaš lokal nalazi na <strong>Klopa.ba</strong>?
                    </h2>
                    <h2 class="reklama-title p-3">
                        Prijavite se <router-link :to="{ name: 'prijava' }">ovdje</router-link> 
                    </h2>
                </div>
                <div class="reklama-img">
                    <img src="../assets/klopa-reklama-1.jpg" alt="" class="reklama-slika">
                </div>
            </div> 
            <div  class="container klopa-top" v-if="filtered">
                <div v-for="(item, index) in filtered.slice(10,50)" :key="index">
                        <router-link :to="{ name: 'detaljno', params: { slug: item.slug } }" class="restoran-link">
                            <div class="restoran-card">
                                    <div class="restoran-image">
                                    <img :src="'/images/' + item.grad.split(' ').join('-').toLowerCase() + '/' + item.slug + '.jpg'" :alt="item.restoran" class="restoran-slika">
                                </div>
                                <div class="restoran-body">
                                    <div class="restoran-title">
                                        <i class="far fa-address-card"></i> 
                                        <p class="restoran-text">
                                            {{ item.restoran }}
                                        </p>
                                    </div>
                                    <div class="restoran-adresa">
                                        <i class="fa-solid fa-map-location"></i>
                                        <p class="restoran-text">
                                            {{ item.podaci.adresa }}
                                        </p>
                                    </div>
                                    <div class="restoran-rating" >
                                        <i class="fas fa-star"></i> 
                                        <p class="restoran-text" v-if="item.rating">
                                            {{ getAverage(item.rating) }}
                                        </p>
                                        <p class="restoran-text" v-else>
                                            0
                                        </p>
                                    </div>
                                </div>
                            </div>
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
    name: "Grad",
    components: {
        Navbar,
        Footer,
        Loading
    },
    data() {
        return {
            slug: this.$route.params.slug.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase()).split('-').join(' '),
            searchValue: '',
            isLoading: true,
            sviRestorani: this.$store.state.grestoran,
            gradSlugs: this.$store.state.gradSlug,
            slugs: []
        }
    },
    methods: {
        ...mapActions(['getRestoranPoGradu', 'getRandomRestoranPoGradu', 'getGradove']),
        getAverage(rate) {
            const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
            const result = average( rate ); // 5  
            return result.toFixed(1);
            // console.log(result);
        },
        async urlCheck() {
            if(this.gradSlugs.includes(this.$route.params.slug)) {
                return true
            } else {
                return this.$router.push({ name: 'notfound'})
            }
        },
    },
    computed: {
        ...mapGetters(['restoranPoGradu', 'randomRestoran', 'sviGradovi']),
        filtered() {
            try {
                let sviRestorani = this.$store.state.grestoran

                if (sviRestorani) {
                    return sviRestorani.filter((data) => {
                        return data.restoran.toUpperCase().includes(this.searchValue.toUpperCase())
                    })   
                } else {
                    return this.restoranPoGradu
                }
            
            } catch (error) {
                return console.log(error);
            }
        },

    },
    async created() {
        await this.getRestoranPoGradu()
        this.getRandomRestoranPoGradu()
        await this.getGradove()
        await this.urlCheck()
        // await this.getGradSlug()
        // console.log(this.$store.state.grestoran);
        document.title = `Klopa.ba | Svi podaci o ${this.slug} | Pronađite najbolji lokal za vas`
        setTimeout(() => {
            this.isLoading = false
        }, 2000)
    },
}
</script>

<style scoped>
.grad-content {
    height: 100%;
}

.klopa-top {
    margin-top: 2%;
    margin-bottom: 2%;
}

.random-restoran {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-size: cover;
    background-position: center;
    
}

.random-restoran .restoran-card {
    height: 100%;
    margin-top: 5%;
    box-shadow: 0.3rem 0.3rem 1rem rgba(24, 38, 40, 0.5)!important;

}

.random-restoran .restoran-image{
    width: 100%;
}


.restoran-link {
    text-decoration: none;
    
}

.restoran-link:hover .restoran-card {
    box-shadow: 0.3rem 0.3rem 1rem rgba(24, 38, 40, 0.9)!important;
}

.restorani-main {
    height: auto;
    display: flex;
    flex-direction: column;
    background-size: cover;
    background-position: center;
}

.restoran-header {
    display: flex;
    justify-content: center;
    margin-top: 5%;
    background-color: #f2d349;
    padding: 1.5rem;
}

.restoran-header .restoran-header-title {
    color: #182628;
    font-size: 2.5rem;
    font-weight: bold;
}

.restoran-card {
    display: flex;
    align-items: center;
    margin-top: 2%;
    margin-bottom: 2%;
    padding: 1rem;
    border: 5px outset #f2d349;
    background-color: rgba(244, 244, 244, 0.9);
    box-shadow: 0.3rem 0.3rem 1rem rgba(24, 38, 40, 0.5)!important;
}

.restoran-image img {
    height: 200px;
    display: block;
    margin: auto;
    width: 300px;
    max-width: 100%;
}

.restoran-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 2%;
}

.restoran-title, .restoran-adresa, .restoran-rating {
    display: flex;
    align-items: center;
}

.restoran-title svg {
    color: #3498DB;
}
.restoran-adresa svg {
    color: #008000;
}
.restoran-rating svg {
    color: lightcoral;
}

.restoran-text {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 15px;
    font-size: 20px;
    font-weight: bold;
    color: #182628;
    
}

/* Reklama Klopa.ba */
.restoran-reklama {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 300px;
    background: #f2d349;
    background-size: cover;
    color: #000;
}

.restoran-reklama .reklama-info, .reklama-img {
    height: 100%;
    width: 100%;
}

.restoran-reklama .reklama-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px;
}

.restoran-reklama .reklama-title {
    font-size: 1.8rem;
    width: 100%;
    text-align: center;
}

.restoran-reklama .reklama-slika {
    max-width: 100%;
    height: 100%;
    padding: 5px;
    display: block;
    margin: auto;
}

.search-form  {
    display: flex;
    width: 50%;
    box-shadow: 0.3rem 0.3rem 1rem rgba(255, 255, 255, 0.5)!important;
    border: 2px solid rgba(24, 38, 40, 0.5);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.search-form input {
    border-radius: 0%;
}

.search-form .search-btn {
    background-color: #f4f4f4;
    width: 50px;
    background-color: #000;
}

.search-form .search-btn svg {
    color: #f2d349;
    height: 100%;
}

@media screen and (max-width: 349px) {
    .restoran-header {
        margin-top: 25%;
    }
    .restoran-header .restoran-header-title {
        font-size: 1.3em;
    }
    .random-restoran .restoran-card {
        flex-direction: column;
        margin-top: 15%;
    }
    .restoran-text {
        font-size: 1em;
    }
    .restoran-image img {
        max-width: 100%;
        margin: auto;
        height: 200px;
        width: 200px;
    }
    .random-restoran .restoran-image {
        height: auto;
    }
    .restoran-body {
        margin-top: 3%;
    }
    .restoran-card {
        flex-direction: column;
    }
        .restoran-reklama {
        flex-direction: column;
        height: 100%;
    }
    .restoran-reklama .reklama-slika {
        height: auto;
    }
    .search-form {
        width: 100%;
    }
       .pointer-content a {
        position: relative;
        top: 90%;
    }
}

@media screen and (min-width: 350px) and (max-width: 480px) {
    .restoran-header {
        margin-top: 25%;
    }
    .random-restoran {
        height: auto;
    }
    .restoran-header .restoran-header-title {
        font-size: 1.3em;
    }
    .random-restoran .restoran-card {
        flex-direction: column;
        margin-top: 15%;
    }
    .restoran-text {
        font-size: 1em;
    }
    .restoran-body {
        margin-top: 3%;
    }
    .restoran-image img {
        max-width: 100%;
        margin: auto;
        height: 270px;
        width: 400px;
    }
    .random-restoran .restoran-image {
        height: auto;
    }
    .search-form {
        width: 100%;
    }
    .restoran-card {
        flex-direction: column;
    }
    .restoran-reklama {
        flex-direction: column;
        height: 100%;
    }
    .restoran-reklama .reklama-slika {
        height: auto;
    }
    .pointer-content a {
        position: relative;
        top: 90%;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 767px){
    .restoran-header {
        margin-top: 25%;
    }
    .random-restoran {
        height: 100%;
    }
    .restoran-header .restoran-header-title {
        font-size: 1.5em;
    }
    .random-restoran .restoran-card {
        flex-direction: column;
    }
    .restoran-card {
        flex-direction: column;
    }

}


/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 768px) and (max-width: 1023px){ 
    .restoran-header {
        margin-top: 15%;
    }
    .random-restoran {
        height: 100%;
    }
    .restoran-header .restoran-header-title {
        font-size: 1.5em;
    }
    .random-restoran .restoran-card {
        flex-direction: column;
    }
        .pointer-content a {
        position: relative;
        top: 90%;
    } 
}


/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 1023px) and (max-width: 1440px) { 


}

@media screen and (min-width: 481px) and (max-width: 767px) and (orientation: landscape) { 
    .restoran-header {
        margin-top: 15%;
    }
    .random-restoran {
        height: auto;
    }
    .restoran-header .restoran-header-title {
        font-size: 1.3em;
    }
    .random-restoran .restoran-card {
        flex-direction: column;
        margin-top: 15%;
    }
    .restoran-text {
        font-size: 1em;
    }
    .restoran-body {
        margin-top: 3%;
    }
    .restoran-image img {
        max-width: 100%;
        margin: auto;
        height: 270px;
        width: 400px;
    }
    .search-form {
        width: 100%;
    }
    .restoran-card {
        flex-direction: column;
    }
    .restoran-reklama {
        flex-direction: column;
        height: 100%;
    }
    .restoran-reklama .reklama-slika {
        height: auto;
    }
    .pointer-content a {
        position: relative;
        top: 90%;
        margin-top: 3%;
        margin-bottom: 3%;
    }
}

@media screen and (min-width: 769px) and (max-width: 1023px) and (orientation: landscape) {
.restoran-header {
        margin-top: 15%;
    }
    .random-restoran {
        height: auto;
    }
    .restoran-header .restoran-header-title {
        font-size: 1.3em;
    }
    .random-restoran .restoran-card {
        flex-direction: column;
    }
    .restoran-text {
        font-size: 1em;
    }
    .restoran-body {
        margin-top: 3%;
    }
    .restoran-image img {
        max-width: 100%;
        margin: auto;
        height: 270px;
        width: 300px;
    }
    .search-form {
        width: 100%;
    }
    .restoran-card {
        flex-direction: column;
    }
    .restoran-reklama {
        flex-direction: column;
        height: 100%;
    }
    .restoran-reklama .reklama-slika {
        height: auto;
    }
    .pointer-content a {
        position: relative;
        top: 90%;
    }
}

</style>
