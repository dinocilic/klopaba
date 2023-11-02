<template>
    
    <div class="form-buttons">
        <button class="btn btn-warning btn-lg" @click="goBack" v-show=!isFirst()>
            Nazad
        </button>
        <button class="btn btn-primary btn-lg" @click="goNext">
            {{ nextButtonText() }}
        </button>
    </div>

</template>

<script>
export default {
    name: "Navigacija",
    methods: {
        nextButtonText() {
            if (this.$store.state.koraci === 3) {
                return 'Završi'
            } 
            return 'Dalje'
        },
        isFirst() {
            return this.$store.state.koraci === 1
        },
        goNext() {
            if (this.$store.state.koraci === 1 ) {
                console.log(this.$store.state.koraci);
                this.$store.state.koraci++
            } else if (this.$store.state.koraci === 2) {
                this.$store.state.koraci++
            } else if (this.$store.state.koraci === 3) {
                this.submit()
            }
        },
        goBack() {
            if (this.$store.state.koraci === 3) {
                this.$store.state.koraci--
            } else if ( this.$store.state.koraci === 2) {
                this.$store.state.koraci--
            }
        },
        submit() {
            alert("Form je gotov!!")
            this.$store.state.submitted = true
        }
    }
}
</script>

<style>

</style>