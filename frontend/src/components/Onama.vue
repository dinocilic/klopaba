<template>
    <div class="main-content">
        <Navbar />

            <div class="onama-header">
                <div class="onama-header-title">
                    <h4>
                        Saznajte više o <strong>Klopa.ba</strong>
                    </h4>
                    <div class="pointer-content" id="pointer-arrow" >
                        <a href="#OnamaMain" class="pointer-down">
                        <i class="fa-solid fa-angles-down"></i>
                        </a> 
                    </div>
                </div>

            </div>


            <div class="onama-content" id="OnamaMain">

                <div class="content-one">

                    <div class="content-header">
                        <div class="header-info">
                            <h1 class="header-title">
                                <strong><em>Naša priča</em></strong>
                            </h1>
                        </div>
                    </div>

                    <div class="content-main container">
                        
                        <div class="row">

                            <div class="col-12 col-sm-12 col-md-12 col-lg-6 klopa-info">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title text-center">
                                            O <strong><em>Klopa.ba</em></strong>
                                        </h4>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">
                                                <strong><em>Klopa.ba</em></strong> je vaša jedina stanica za pronalazak tog specijalnog lokala za dobar provod.
                                            </p>
                                            <p class="card-text">
                                                Na <strong><em>Klopa.ba</em></strong> možete da nađete razne vrste lokala od pizzerija, fast-food do restorana. <br>
                                            </p>
                                            <p class="card-text">
                                                <strong><em>Klopa.ba</em></strong> je nastala kao ideja da skupi sve najbolje lokale na jedno mjesto i samim time olakša pronalazak lokala za vas. 
                                            </p>
                                            <p class="card-text">
                                                Jednostavno, u novom ste gradu, ne znate gdje da idete da jedete ili da uzmete neki snack usput? Zato smo mi tu da vas uputimo na najbolje lokale.
                                            </p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 col-sm-12 col-md-12 col-lg-6 klopa-onama-logo">
                                <img src="@/assets/klopa-logo.png" alt="" class="img-fluid">
                            </div>


                        </div>


                    </div>
                </div>

                <div class="content-two" id="pitanjaId">
                    <div class="content-header">
                        <div class="header-info">
                            <h1 class="header-title">
                                <strong><em>Često postavljena pitanja.</em></strong>
                            </h1>
                        </div>
                    </div> 

                    <div class="question-img">
                        <img src="@/assets/question-mark-1.png" alt="" class="img-fluid">
                    </div>

                    <div class="content-main container">
                        
                        <div class="pitanja">

                            <div class="pitanje-jedan shadow-lg p-3" data-bs-toggle="collapse" href="#pitanje-jedan" role="button" aria-expanded="false" aria-controls="pitanje-jedan">
                                <div class="pitanje-header">
                                    <h4 class="pitanje-title" >
                                        Šta je <strong><em>Klopa.ba</em></strong> ?  
                                    </h4>
                                    <i class="fa-solid fa-circle-arrow-down"></i>
                                </div>
                                <div class="collapse" id="pitanje-jedan">
                                    <p class="pitanje-text">
                                        <strong><em>Klopa.ba</em></strong> je vaš vodić za pronalazak najboljeg lokala za vas. Na <strong><em>Klopa.ba</em></strong> ćete naći razne lokale od pizzerija, fast-food, restorana i pubova. <br>Sve što preostaje je da se odlučite koji lokal da posjetite! <i class="fa-solid fa-face-grin"></i> 
                                    </p>
                                </div>
                            </div>

                            <div class="pitanje-dva shadow-lg p-3" data-bs-toggle="collapse" href="#pitanje-dva" role="button" aria-expanded="false" aria-controls="pitanje-dva">
                                <div class="pitanje-header">
                                    <h4 class="pitanje-title" >
                                       Kako <strong><em>Klopa.ba</em></strong> vrši odabir lokala?  
                                    </h4>
                                    <i class="fa-solid fa-circle-arrow-down"></i>
                                </div>
                                <div class="collapse" id="pitanje-dva">
                                    <p class="pitanje-text">
                                        <strong><em>Klopa.ba</em></strong> vrši odabir lokala na osnovu dugog istraživanja određenog grada. Mi prvo uzmemo sve faktore u obzir kada vršimo selekciju lokala za određeni grad, lokaciju lokala, prisustvo lokala na društvenim mrežama, posjećenost i mnoge druge informacije. Kada se sve te informacije skupe i obrade onda se vaš lokal dodaje na našu listu.
                                    </p>
                                </div>
                            </div>
                            
                            <div class="pitanje-tri shadow-lg p-3" data-bs-toggle="collapse" href="#pitanje-tri" role="button" aria-expanded="false" aria-controls="pitanje-tri">
                                <div class="pitanje-header">
                                    <h4 class="pitanje-title" >
                                        Da li se moj lokal može nalaziti na <strong><em>Klopa.ba</em></strong> ?  
                                    </h4>
                                    <i class="fa-solid fa-circle-arrow-down"></i>
                                </div>
                                <div class="collapse" id="pitanje-tri">
                                    <p class="pitanje-text">
                                        Da, naravno. Ukoliko želite da se i vaš lokal nalazi na <strong><em>Klopa.ba</em></strong> možete sami da se prijavite preko naše forme za prijavu na linku za prijavu ili da nas kontaktirate putem emaila ili neke druge opcije koju možete da nađete na sekciji kontakt.
                                    </p>
                                </div>
                            </div>
                            
                            <div class="pitanje-cetri shadow-lg p-3" data-bs-toggle="collapse" href="#pitanje-cetri" role="button" aria-expanded="false" aria-controls="pitanje-cetri">
                                <div class="pitanje-header">
                                    <h4 class="pitanje-title" >
                                        Da li se plaća <strong><em>Klopa.ba</em></strong> ?  
                                    </h4>
                                    <i class="fa-solid fa-circle-arrow-down"></i>
                                </div>
                                <div class="collapse" id="pitanje-cetri">
                                    <p class="pitanje-text">
                                        Ne, <strong><em>Klopa.ba</em></strong> je besplatna i uvijek će biti. Prijava vaša se nikada neće naplaćivati i uvijek će biti besplatna. Također i vaši podaci ostaju sigurni sa nama. 
                                    </p>
                                </div>
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

export default {
    name: "Onama",
    components: {
        Navbar,
        Footer
    },
    data() {
        return {
            pageTitle: "Klopa.ba | O nama"
        }
    },
    created() {
        document.title = this.pageTitle
    }
}
</script>

<style scoped>
.main-content {
    height: 100%;
    scroll-behavior: smooth;
}

.row {
    padding: 0;
    margin: 0;
    height: 100%;
}

.onama-header {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../assets/header-onama.png');
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #182628;
}
.onama-header-title {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.onama-header-title h4 {
    color: #f2d349;
    font-size: 3em;
}
.pointer-content a {
    display: flex;
    align-items: center;
    justify-content: center;
}
.pointer-content a {
    top: 100%;
    width: 100%;
    height: 30vh;
}

.onama-content {
    height: auto;
}

.content-one {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.content-two {
    height: auto;
    margin-bottom: 5%;
}


.content-header {
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: 50px;
}
.content-main {
    margin-top: 5%;
}
.content-main .klopa-info {
    display: flex;
    justify-content: center;
    align-items: center;
}
.content-main .card-text {
    text-align: left;
}

.klopa-info .card-title {
    font-size: 2rem;
}

.klopa-info .card-header, .card {
    background-color: #f4f4f4;
    border: none;
    color: #182628;
    /* font-weight: bold; */
    font-size: 1.2rem;
    /* text-shadow: 0.5px 0.5px #f2d349; */
}

.content-main .pitanja {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.question-img img {
    max-width: 100%;
    display: block;
    margin: auto;
    height: 200px;
}

.pitanja .pitanje-jedan, .pitanje-dva, .pitanje-tri, .pitanje-cetri {
    width: 100%;
    margin: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
}

.pitanja .pitanje-header {
    display: flex;
    justify-content: space-between;
}

.pitanja .pitanje-jedan:hover, .pitanje-dva:hover, .pitanje-tri:hover, .pitanje-cetri:hover {
    box-shadow: 0 1rem 2rem rgba(73,104,242, 0.5)!important;
}

.pitanja .pitanje-title {
    font-size: 25px;
}

.pitanja svg {
    height: 30px;
    color: #f2d349;
}
.pitanja .pitanje-text {
    padding-top: 20px;
    text-align: left;
}

.pitanja .pitanje-text svg {
    height: 20px;
}

@media only screen and (max-width: 374px) {
    
    .onama-header {
        background-position:center;
        background-size: 100%;
    }
    .onama-header-title {
        width: 85%;
        top: 48%;
    }
    .onama-header-title h4 {
        font-size: 1.2em;
    }
    .content-one {
        height: auto;
    }
    .content-main .klopa-info {
        display: flex;
        align-items: flex-start;
        height: 20%;
    }
    .content-main .card-text {
        font-size: .8em;
    }
    .content-main {
        margin-bottom: 5%;
    }
    .pitanja .pitanje-title {
        font-size: 1em;
    }
    .klopa-onama-logo {
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .klopa-onama-logo img {
        max-width: 60%;
        display: block;
        margin: auto;
    }
    .pointer-content svg {
        height: 40px;
    }
    .header-title {
        text-align: center;
        font-size: 1.2em;
    }
    .question-img img {
        max-width: 70%;
        height: auto;
    }
}


/* even smaller devices  */
@media only screen and (min-width: 375px) and (max-width: 480px){
    .onama-header {
        background-position:center;
        background-size: 100%;
    }
    .onama-header-title {
        width: 85%;
        top: 50%;
    }
    .onama-header-title h4 {
        font-size: 1.2em;
    }
    .content-one {
        height: auto;
    }
    .content-main .klopa-info {
        display: flex;
        align-items: flex-start;
        height: 20%;
    }
    .content-main .card-text {
        font-size: .8em;
    }
    .content-main {
        margin-bottom: 5%;
    }
    .pitanja .pitanje-title {
        font-size: 1em;
    }
    .klopa-onama-logo {
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .klopa-onama-logo img {
        max-width: 60%;
        display: block;
        margin: auto;
    }
    .pointer-content svg {
        height: 40px;
    }

}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 768px){ 
    .onama-header {
        background-position:center;
        background-size: 100%;
    }
    .onama-header-title {
        width: 85%;
        top: 50%;
    }
    .onama-header-title h4 {
        font-size: 2em;
    }
    .content-one {
        height: auto;
    }
    .content-main .klopa-info {
        display: flex;
        align-items: flex-start;
        height: 20%;
    }
    .klopa-onama-logo {
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .klopa-onama-logo img {
        max-width: 60%;
        display: block;
        margin: auto;
    }
}

@media screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) { 
    .onama-header {
        background-position: bottom center;
        background-size: 70%;
    }
    .content-header {
        margin-top: 5%;
        margin-bottom: 0;
    }
    .content-two .content-header {
        margin-bottom: 5%;
    }
    .content-one {
        height: auto;
    }
    .content-main .klopa-info {
        display: flex;
        align-items: flex-start;
        height: 20%;
    }
    .content-main .card-text {
        font-size: .8em;
    }
    .content-main {
        margin-bottom: 5%;
    }
    .pitanja .pitanje-title {
        font-size: 1em;
    }
    .klopa-onama-logo {
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .klopa-onama-logo img {
        max-width: 60%;
        display: block;
        margin: auto;
    }
}
/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 769px) and (max-width: 1023px){ 
    .onama-header {
        background-position:center;
        background-size: 100%;
    }
    .onama-header-title {
        width: 85%;
        top: 50%;
    }
    .onama-header-title h4 {
        font-size: 2em;
    }
    .content-one {
        height: auto;
    }
    .content-main .klopa-info {
        display: flex;
        align-items: flex-start;
        height: 20%;
    }
    .klopa-onama-logo {
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .klopa-onama-logo img {
        max-width: 60%;
        display: block;
        margin: auto;
    }
}

@media screen and (min-width: 769px) and (max-width: 1023px) and (orientation: landscape) {
    .content-header {
        margin-top: 5%;
        margin-bottom: 0;
    }
    .onama-header {
        background-position:bottom center;
        background-size: 70%;
    }
    .content-one {
        height: auto;
    }
    .content-main .klopa-info {
        display: flex;
        align-items: flex-start;
        height: 20%;
    }
    .content-main .card-text {
        font-size: .8em;
    }
    .content-main {
        margin-bottom: 5%;
    }
    .pitanja .pitanje-title {
        font-size: 1em;
    }
    .klopa-onama-logo {
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .klopa-onama-logo img {
        margin: auto;
        max-width: 50%;
        display: block;
    }
    .content-two .content-header {
        margin-bottom: 5%;
    }
}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 1023px) and (max-width: 1440px) { 
}

</style>