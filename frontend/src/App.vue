<template>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component"></component>
      </transition>
    </router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>

#app {
  font-family: 'Roboto' monospace;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #f2f2f2;
  scroll-behavior: smooth;
}

textarea {
  resize: none;
}

input:focus, textarea:focus, select:focus{
    outline: none;
}

.main-content {
    height: 100%;
}
.active {
    background-color: #182628;
    color: #f2d349;
}

.opciono {
    color: #008000;
    font-size: 16px;
    font-weight: bold;
    text-shadow: 1px 1px #f4f4f4;
}

.error-title {
    color: red;
    font-size: 16px;
    font-weight: bold;
    text-shadow: 1px 1px #f4f4f4;
}

.wordcount-text {
    color: #666;
    font-size: 16px;
    font-weight: bold;
}

.preporuceno {
    color: #3498DB;
    font-size: 16px;
    font-weight: bold;
    text-shadow: 1px 1px #f4f4f4;
}

.row {
  margin: 0;
  padding: 0;
}

.boldiraj {
  font-weight: bold;
  color: #008000;
}

/* Pointer down */
.pointer-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.pointer-content a {
    position: absolute;
    top: 86%;
    color: #182628;
}   

.pointer-content svg {
    height: 60px;
    animation: arrow-animation 2s infinite;
}

@keyframes arrow-animation {
  0%   {color: #182628;}
  50%  {color: #f2d349;}
  100% {color: #182628;}
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
