<template>
    <div class="komentari-content">
        <div class="komentari-box">
            <div class="nema-komentara" v-if="!restoran.komentari.length">
                <p class="komentar-text">
                    Nema komentara
                </p>
                <p class="komentar-text" >
                    Budite <strong>prvi</strong>  i ostavite vaš dojam za 
                    <strong><em>
                        {{ restoran.restoran }}
                    </em></strong> 
                </p>
            </div>
            <div class="komentari" v-else v-for="komentar in restoran.komentari" :key="komentar.id">
                <div class="komentar">
                    <p class="rating" v-if="komentar.rate">
                       <i class="fas fa-star"></i> 
                        <strong>
                            {{ komentar.rate }}
                        </strong>
                    </p>
                    <p class="komentar-text">
                        {{ komentar.komentar }}
                    </p>
                </div>
                <div class="komentar-podaci">
                    <p class="komentar-osoba">
                        Postavio: <strong><em>{{ komentar.ime }} {{ komentar.prezime }}</em></strong>
                    </p>
                    <p class="komentar-vrijeme">
                    Vrijeme: <strong><em> {{ komentar.createdAt }} </em></strong> 
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "Komentari",
    methods: {
         ...mapActions(['getRestoran']),
    },
    computed: {
        ...mapGetters(['restoran'])
    },
    created() {
        this.getRestoran()
    }
}
</script>

<style scope>
.komentari-box {
    display: flex;
    flex-direction: column;

}

.komentari-box .rating {
    display: flex;
    align-items: center;
}

.komentari-box .rating svg {
    color: rgb(0, 0, 0);
    margin-right: 10px;
}

.komentari-box .komentari, .nema-komentara  {
    margin-top: 2%;
    padding: 1rem;
    background-color: rgba(242, 242, 242, 1);
    border: 2px double #000;
    box-shadow: 0.3rem 0.3rem 1rem rgba(24, 38, 40, 0.8)!important;
}

.komentar-podaci {
    display: flex;
    justify-content: space-evenly;
}

.komentar-text {
    color: #182628;
}

.komentari-box .rating svg {
    height: 20px;
    color: #f2d349;
    text-shadow: 0.3rem 0.3rem 1rem rgba(24, 38, 40, 0.8)!important;
}

@media screen and (min-width: 300px) and (max-width: 349px) {
 
}

@media screen and (min-width: 350px) and (max-width: 480px) {
}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 767px){

}

@media screen and (min-width: 481px) and (max-width: 767px) and (orientation: landscape) { 
    
}
/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 768px) and (max-width: 1023px){ 

}

@media screen and (min-width: 769px) and (max-width: 1023px) and (orientation: landscape) {

}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 1023px) and (max-width: 1440px) { 

}


</style>