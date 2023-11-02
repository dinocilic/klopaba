<template>
    <div class="zahvalnica container">
        <div class="zahvalnica-header">
            <h1 class="zahvalnica-title">
                Hvala vam na prijavi na <strong>Klopa.ba</strong>
            </h1>
        </div>
        <div class="zahvalnica-content p-5"> 
            <p class="zahvalnica-text">
                Vaša prijava će biti poslata vama na email sa svim detaljima koje ste unjeli.
            </p>
            <p class="zahvalnica-text">
                Mi ćemo da razmotrimo vašu prijavu i da vam se javimo u roku od 24 sata. 
            </p>
            <p class="zahvalnica-text">
                Hvala Vam na razumijevanju. 
            </p>
        </div>
        <div class="zahvalnica-support">
            <p class="zahvalnica-text">
                Ukoliko imate neki pitanja, obratite nam se putem jedne od navedenih opcija:
            </p>
            <ul class="list-group">
                <li class="list-group-item mail-icon">
                    <i class="fa-solid fa-at"></i> <a href="#"><address>info@klopa.ba</address></a>
                </li>
                <li class="list-group-item">
                    <div class="socijalna-lista">
                        <a href="https://www.facebook.com/klopaba.svijet" target="_blank"><i class="fab fa-facebook facebook-url"></i></a> 
                        <a href="https://www.instagram.com/klopaba.svijet/" target="_blank"><i class="fab fa-instagram instagram-url"></i></a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="zahvalnica-povratak">
            <p class="zahvalnica-text">
                Vratite se na <a href="/">početnu</a> 
            </p>   
        </div>
    </div>
</template>


<script>
export default {
    name: "Zahvalnica"
}
</script>

<style scoped>
.zahvalnica {
    margin-top: 5%;
    margin-bottom: 5%;
    padding: 2rem;
    background-color: #f2d349;
    border: 2px solid #000;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;
}

.zahvalnica-title {
    font-size: 3rem;
    position: relative;
    margin: 0;
    background-color: #f2d349;
    color: #000;
    text-align: center;
    padding: 1rem;
}

.zahvalnica-content {
    color: #000;
}

.zahvalnica-text {
    font-size: 20px;
    padding: .5rem;
    text-align: center;
    font-weight: bold;
}
.zahvalnica .list-group {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
}

.zahvalnica .list-group-item {
    display: flex;
    width: 350px;
    align-items: center;
    margin: 5px;
    background-color: #fff;
    border: 2px double #000;
    box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.5)!important;
}

.zahvalnica address {
    margin-bottom: 0%;
}

.zahvalnica .list-group-item a {
    margin-top: 5px;
}

.zahvalnica .list-group-item svg {
    height: 30px;
    margin-right: 20px;
}

.mail-icon {
    color: lightcoral;
}

.zahvalnica svg {
    margin: 0;
}

.zahvalnica .socijalna-lista {
    padding: 0.1rem;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}

.zahvalnica .list-group-item .facebook-url {
    color: #4267B2;
}
.zahvalnica .list-group-item .twitter-url {
    color: #1DA1F2;
}

.zahvalnica .list-group-item .instagram-url {
    color: #C13584;
}

.zahvalnica .list-group-item .linkedin-url {
    color: #0077b5;
}

.zahvalnica .list-group-item svg:hover {
    opacity: .7;
}

.zahvalnica-povratak {
    margin-top: 2%;
}

@media screen and (max-width: 349px) {
    .zahvalnica-title {
        font-size: 1.2em;
    }
    .zahvalnica-content {
        padding: 0 !important;
    }
    .zahvalnica-text {
        font-weight: 400;
    }
    .zahvalnica .list-group-item {
        width: 100%;
    }
    .zahvalnica .list-group-item svg {
        margin-right: 5px;
    }
}

@media screen and (min-width: 350px) and (max-width: 480px) {
    .zahvalnica-title {
        font-size: 1.5em;
    }
    .zahvalnica-content {
        padding: 0 !important;
    }
    .zahvalnica-text {
        font-weight: 400;
    }

}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 767px){
        .zahvalnica-title {
        font-size: 1.5em;
    }
    .zahvalnica-content {
        padding: 0 !important;
    }
    .zahvalnica-text {
        font-weight: 400;
    }
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