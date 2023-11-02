<template>
    <header class="header">
        <div class="header-content">
            <div class="header-text">
                <h1>
                    Želite jesti? Ali ne znate gdje?
                </h1>
                <p>
                   Ne brinite se! Tu je <strong class="title-color"> {{  naziv  }} </strong> da vas uputi na najbolji lokal u gradu.
                </p>
                <a href="#glavniGradovi" class="btn btn-primary btn-lg header-btn">
                    Istražite
                </a>
            </div>

            <div class="pointer-content" id="pointer-arrow" >
               <a href="#oKlopa" class="pointer-down">
                   <i class="fa-solid fa-angles-down"></i>
                </a> 
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            naziv: "Klopa.ba",
        }
    }
}
</script>

<style scoped>
.header {
    height: 100%;
}

.header-content {
    height: 100%;
    background: url('../../assets/klopa-pizza.jpg');
    background-size: cover;
    background-position: right;
}

.header-text {
    display: flex;
    position: absolute;
    top: 30%;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.header-text h1 {
    color: #f2f2f2;
    letter-spacing: 1.5px;
    font-size: 3rem;
    font-weight: bold;
    text-shadow: 3px 3px #182628;
}

.header-text p {
    font-size: 2rem;
    color: #f2f2f2;
    text-shadow: 3px 3px #182628;
}


.title-color {
    color: #f2d349;
    text-shadow: 3px 3px #182628;
}

@media screen and (min-width: 200px) and (max-width: 374px) {
    .header-text {
        text-align: center;
    }
    .header-text h1 {
        font-size: 1.5rem;
    }
    .header-text p {
        font-size: 1rem;
    }
}

/* Mobile Devices */
@media screen and (min-width: 375px) and (max-width: 480px) {    
    .header-text {
        text-align: center;
    }
    .header-text h1 {
        font-size: 1.5rem;
    }
    .header-text p {
        font-size: 1rem;
    }
    .header-content {
        background-size: cover;
        background-position: right;
    }
    .pointer-down {
        top: 90%;
    }
}

        
/* Low resolution Tablets and iPads */
@media only screen and (min-width: 481px) and (max-width: 768px){
    .header-text h1 {
        font-size: 1.5rem;
    }
    .header-text p {
        font-size: 1rem;
    }
    .header-content {
        background-size: cover;
        background-position: left;
    }
    .pointer-down {
        top: 90%;
    }
}

@media screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) {
    .pointer-down {
        top: 80%;
    }
    .pointer-content svg {
        height: 40px;
    }
}
        
/* Tablets iPads (Portrait) */
@media screen and (min-width: 769px) and (max-width: 1024px) {
    .header-content {
        background-size: cover;
        background-position: center left;
    }
    .header-text h1 {
        font-size: 2.3em;
    }
    .header-text p {
        font-size: 1.5em;
    }
    .pointer-down {
        top: 85%;
    }
    .pointer-down svg {
        height: 70px;
    }
}

@media screen and (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {
    .header-text {
        top: 40%;
    }
    .pointer-down {
        top: 90%;
    }
    .pointer-down svg {
        height: 30px;
    }
}
    
/* Laptops and Desktops */
@media (min-width: 1025px) and (max-width: 1280px){
    .header-text h1 {
        font-size: 2.2em;
    }
    .header-text p {
        font-size:1.2em;
    }

}
    
/* Big boi Monitors */
@media (min-width: 1281px) {

}


</style>