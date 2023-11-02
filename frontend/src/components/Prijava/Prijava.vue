<template>
    <div class="main-content">
        <Navbar />
                    
            <div class="prijava-header container" v-if="!this.$store.state.submitted">
                <div class="prijava-header-content">
                    <div class="prijava-head">
                        <h4 class="prijava-title">
                            Dobrodošli na <strong><em>Klopa.ba</em></strong> prijavu! 
                        </h4>
                    </div>
                    <div class="prijava-body">
                        <p class="prijava-text">
                            Molimo popunite sve podatke označene sa *. Ukoliko imate problema sa prijavom obratite nam se preko emaila ili putem društvenih mreža. 
                        </p>
                        <p class="prijava-text">
                            Nakon prijave provjerit ćemo vaše podatke i javiti se u roku od 24 sata, da li ste odobreni na <strong>Klopa.ba</strong>
                        </p>
                    </div>
                </div>  
            </div>

            <main class="prijava-main container" id="prijavaId" v-if="!this.$store.state.submitted">

                <div class="prijava-koraci">
                    <div class="prvi-korak" :class="{'active': this.$store.state.koraci === 1}">
                        <h4 class="korak-title">
                            1. Prijava Lokala
                        </h4>
                    </div>
                    <div class="drugi-korak" :class="{'active': this.$store.state.koraci === 2}">
                        <h4 class="korak-title">
                            2. Podaci o Lokalu
                        </h4>
                    </div>
                    <div class="treci-korak" :class="{'active': this.$store.state.koraci === 3}">
                        <h4 class="korak-title">
                            3. Slika i Opis
                        </h4>
                    </div>
                </div>
                <form class="form" ref="form" @submit.prevent @keydown.enter.prevent>

                    <div v-show="this.$store.state.koraci === 1">
                        <KorakJedan />
                    </div>

                    <div v-show="this.$store.state.koraci === 2">
                        <KorakDva />
                    </div>

                    <div v-show="this.$store.state.koraci === 3">
                        <KorakTri />
                    </div>

                </form>

            </main>

            <main v-else class="zahvalnica">
                <Zahvalnica />
            </main>



        <Footer />
    </div>

</template>

<script>
import Navbar from '@/components/Includes/Navbar.vue';
import Footer from '@/components/Includes/Footer.vue';
import KorakJedan from '@/components/Prijava/KorakJedan.vue'
import KorakDva from '@/components/Prijava/KorakDva.vue'
import KorakTri from '@/components/Prijava/KorakTri.vue'
import Zahvalnica from '@/components/Prijava/Zahvalnica.vue'

export default {
    name: "Prijava",
    components: {
        Navbar,
        Footer,
        KorakJedan,
        KorakDva,
        KorakTri,
        Zahvalnica
        // Navigacija
    },
    data() {
        return {
            gradovi: [],
            isEditing: false,
            dirty: true
        }
    },
    created() {
        document.title = "Klopa.ba | Prijavite vaš lokal na Klopa.ba | Vaše informacije su sigurne sa nama |"
    }

}
</script>

<style>

.prijava-content {
    height: 100%;
}

.prijava-header {
    text-align: center;
    position: relative;
    padding-top: 10%;
}

.prijava-header-content {
    padding: 2em;
    background-color: #f2d349;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;

}

.prijava-title {
    padding-top: 10px;
    padding-bottom: 10px;
}

.prijava-koraci {
    display: flex;
    justify-content: space-around;
    margin-top: 5%;
    background-color: #f2d349;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;
}

.prijava-koraci .prvi-korak, .drugi-korak, .treci-korak {
    width: 100%;
    border: 2px solid #000;
    padding: .5rem;
    text-align: center;
    cursor: pointer;
}

.prijava-main {
    margin-bottom: 10%;
}

.form {
    margin-top: 3%;
}

.form-row {
    display: flex;
    justify-content: space-around;
}

.form-group {
    width: 100%;
    margin: 2%;
}

.form-label {
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form-input {
    width: 100%;
    padding: 10px;
    border: 2px solid #000;
    border-radius: 10px;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;
}

.form-buttons {
    width: 100%;
    display: flex;
    margin-top: 5%;
    margin-bottom: 5%;
    justify-content: space-around;
}

.form-buttons .btn {
    width: 200px;
    height: 50px;
    border: 2px solid #000;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;
}

@media screen and (max-width: 349px) {
    .prijava-header {
        padding-top: 25%;
    }
    .prijava-koraci {
        flex-direction: column;
    }
}

@media screen and (min-width: 350px) and (max-width: 480px) {
    .prijava-header {
        padding-top: 25%;
    }
    .prijava-koraci {
        flex-direction: column;
    }
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
@media screen and (min-width: 1024px) and (max-width: 1440px) { 

}

</style>