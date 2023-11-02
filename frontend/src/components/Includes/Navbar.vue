<template>

<nav class="navbar navbar-expand-lg" id="topBar">
  <div class="navbar-content container">
    <div class="app-name">
      <router-link :to="{ name: 'pocetna' }" class="navbar-brand">
            <img src="@/assets/klopa-logo.png" alt="Klopa.ba | Pronađite najbolji lokal u vašem gradu | Logo " class="navbar-logo">
            <strong><em>Klopa.ba</em></strong>
      </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fa-solid fa-bars-staggered"></i>
        </button>
    </div>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
            <a :href="$router.resolve({name: 'pocetna'}).href" class="nav-link"> Početna </a>
            <!-- <router-link :to="{ name: 'pocetna' }" class="nav-link"> Početna </router-link> -->
        </li>
        <li class="nav-item">
            <a :href="$router.resolve({name: 'onama'}).href" class="nav-link"> O nama </a>
            <!-- <router-link :to="{ name: 'onama' }" class="nav-link"> O nama </router-link> -->
        </li>
        <li class="nav-item">
          <a :href="$router.resolve({name: 'gradovi'}).href" class="nav-link"> Gradovi </a>
          <!-- <router-link :to="{ name: 'gradovi' }" class="nav-link"> Gradovi </router-link> -->
        </li>
        <li class="nav-item">
          <a :href="$router.resolve({name: 'kontakt'}).href" class="nav-link">Kontakt</a>
          <!-- <router-link :to="{ name: 'kontakt' }" class="nav-link"> Kontakt </router-link> -->
        </li>
        <li class="nav-item">
          <a :href="$router.resolve({name: 'prijava'}).href" class="nav-link">Prijava</a>
        </li>
      </ul>
    </div>
  </div>
</nav>


</template>


<script scoped>
export default {
    name: "Navbar",
}
</script>

<style scoped>
.navbar {
  display: block;
  /* background-color: #f2d349; */
  background-color: #f2d349;
  width: 100%;
}

.navbar-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.navbar-content .navbar-collapse {
  justify-content: flex-end;
}

.navbar-collapse .nav-link {
  /* color: #182628; */
  color: #182628;
  font-weight: bold;
  font-size: 1.2em;
}

.navbar-collapse .nav-link:hover {
  color: #f4f4f4;
  text-shadow: 1px 1px #000;
}

.navbar-brand {
  color: #000;
}

.navbar-brand:hover {
  color: #f4f4f4;
  text-shadow: 1px 1px #000;
}

.navbar-logo {
  height: 80px;
}

.navbar-toggler {
  border: 2px outset #000;
  height: 50px;
}
.collapse {
  width: 100%;
}

.sticky {
  position: fixed;
  width: 100%;
  display: block;
}

/* Mobile Devices */
@media only screen and (max-width: 480px) {
  .navbar-logo {
    height: 50px;
  }
  .app-name {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .navbar {
    z-index: 1;
  }
}
        
/* Low resolution Tablets and iPads */
@media only screen and (min-width: 481px) and (max-width: 768px) {
  .app-name {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .navbar-logo {
    height: 50px;
  }
  .navbar-toggler {
    height: 30px;
    width: 50px;
  }
  .navbar {
    z-index: 1;
  }
}
  
        
/* Tablets iPads (Portrait) */
@media (min-width: 769px) and (max-width: 1024px){    
  .navbar {
    z-index: 1;
  } 
  .app-name {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
    
/* Laptops and Desktops */
@media (min-width: 1025px) and (max-width: 1280px){
}
    
/* Big boi Monitors */
@media (min-width: 1281px) {

}

@media screen and (orientation: landscape)  {
  .navbar {
    z-index: 1;
  }
    .app-name {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
}

</style>