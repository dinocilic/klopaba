<template>
    <transition name="fade">
    <div id="loading-screen" class="loader">
        <img src="@/assets/klopaba.gif" alt="Loading..." class="loading-slika">
    </div>
    </transition>
</template>

<script>
export default {
    name: "Loading",
}
</script>

<style>

.loader {
    position: absolute;
    z-index: 1000;
    background-color: #f2f2f2;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
}

.loading-slika {
    max-width: 100%;
    display: block;
    margin: auto;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>