<template>
  <div class="not-found">  
      <Navbar />
      <div class="not-found-content container">
        
        <div class="not-found-more">
          <div class="not-found-status">
              <h1 class="not-found-title text-center">
                  404
              </h1>
          </div>

          <div class="not-found-info">
              <h4 class="not-found-text">
                 <strong>
                    Stranica koju ste tražili ne postoji na <em>Klopa.ba</em>
                </strong> 
              </h4>
              <h4 class="not-found-text">
                Vratite se na <a href="/">Početnu</a> ili ako želite da pronađete odgovarajući grad idite na <a href="/gradovi">Gradovi</a>
              </h4>
          </div>
          <div class="not-found-hv">
              <h4 class="not-found-text">
                  Želimo vam sretno istraživanje na <strong><em>Klopa.ba</em></strong>
              </h4>
          </div>
        </div>


      </div>

      <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Includes/Navbar'
import Footer from '@/components/Includes/Footer'

export default {
    name: "NotFound",
    components: {
        Navbar,
        Footer
    }
}
</script>

<style>

.not-found {
    height: 100%;
}

.not-found-content {
    height: inherit;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
}

.not-found-status, .not-found-info {
    margin-top: 2%;
    margin-bottom: 2%;
}

.not-found-title {
    font-size: 10rem;
}

.not-found-text {
    text-align: center;
    font-size: 1.5rem;
    padding: 1rem;
}

.not-found-more {
    padding: 5em;
    background-color: #f2d349;
}


@media only screen and (max-width: 374px) {
    
}


/* even smaller devices  */
@media only screen and (min-width: 375px) and (max-width: 480px){
    .not-found-more {
        padding: 2em;
    }
    .not-found-text {
        font-size: 1.2em;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 481px) and (max-width: 768px){ 
    .not-found-more {
        padding: 2em;
    }
    .not-found-text {
        font-size: 1.2em;
    }
}

@media screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) { 
}
/* Medium devices (tablets, 768px and up) */
@media screen and (min-width: 769px) and (max-width: 1023px){ 
        .not-found-more {
        padding: 2em;
    }
    .not-found-text {
        font-size: 1.2em;
    }
}

@media screen and (min-width: 769px) and (max-width: 1023px) and (orientation: landscape) {

}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 1023px) and (max-width: 1440px) { 
}

</style>