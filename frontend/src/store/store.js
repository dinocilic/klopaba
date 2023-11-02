import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router/router.js'
// import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    logged: false,
    form: {
      // Prvi Korak
      ime: null,
      prezime: null,
      email: null,
      telefon: null,
      // Drugi Korak
      lokal: null,
      adresa: null,
      grad: null,
      zip: null,
      website: null,
      facebook: null,
      instagram: null,
      twitter: null,
      linkedin: null,
      // Treci Korak
      opis: null,
      slika: {
        ime: null,
        size: null,
        type: null,
        url: null
      },
      kreirani: false
    },
    koraci: 1,
    submitted: false,
    searchList: [],
    sviRestorani: [],
    grad: null,
    gradSlug: [],
    data: [],
    gradovi: [],
    isLoading: true,
    quote: []
  },  
  getters: {
    glavniGradovi: state => state.glavni,
    ostaliGradovi: state => state.ostali,
    sviGradovi:  state => state.gradovi,
    randomRestorani: state => state.restorani,
    quote: state => state.quote,
    restoran: state => state.restoran,
    restoranPoGradu: state => state.grestoran,
    randomRestoran: state => state.rrestoran,
    grad: state => state.grad
  },
  mutations: {
    // Prvi Korak
    setIme: (state, ime) => state.form.ime = ime,
    setPrezime: (state, prezime) => state.form.prezime = prezime,
    setEmail: (state, email) => state.form.email = email ,
    setTelefon: (state, telefon) => state.form.telefon = telefon,
    // Drugi Korak
    setLokal: (state, lokal) => state.form.lokal = lokal,
    setGrad: (state, grad) => state.form.grad = grad,
    setUlicu: (state, ulica) => state.form.adresa = ulica,
    setZip: (state, zip) => state.form.zip = zip,
    setFacebook: (state, facebook) => state.form.facebook = facebook,
    setInstagram: (state, instagram) => state.form.instagram = instagram,
    setTwitter: (state, twitter) => state.form.twitter = twitter,
    setLinkedin: (state, linkedin) => state.form.linkedin = linkedin,
    setWebsite: (state, website) => state.form.website = website,
    // Treci Korak
    setSliku: (state, slika) => state.form.slika = slika,
    setOpis: (state, opis) => state.form.opis = opis,
    // Klopa gradovi
    setGlavneGradove: (state, glavni) => state.glavni = glavni,
    setOstaleGradove: (state, ostali) => state.ostali = ostali,
    setSveGradove: async (state, gradovi) => {
      state.gradovi = gradovi
      await gradovi.filter((item) => {
        state.gradSlug.push(item.slug)
      })
    },
    setRandomRestorane: (state, restorani) => state.restorani = restorani,
    setQuote: (state, quote) => state.quote = quote,
    setRestoran: async (state, restoran) => {
      state.restoran = restoran
      state.isLoading = false
      // await restoran.filter((item) => {
      //   state.data = item.restorani
      //   console.log(state.data);
      // })

    },
    setRestoranPoGradu: async (state, grestoran) => {
      // state.grestoran = grestoran
      // await grestoran.filter((item) => {
      //   state.grad = item.mjesto
      //   state.grestoran = item.restorani
      // })
      state.grestoran = grestoran
    },
    setRandomRestoranPoGradu: (state, rrestoran) => state.rrestoran = rrestoran,
  },
  actions: {
    // Za Komponentu Gradovi.vue - gdje se nalaze svi gradovi i random restorani
    async getGlavneGradove({commit}) {
      const res = await axios.get('/api/gradovi')
      commit('setGlavneGradove', res.data)
    },
    async getOstaleGradove( { commit} ) {
      const res = await axios.get('/api/gradovi/ostali')
      commit('setOstaleGradove', res.data.slice(0 ,10))
    },
    async getGradove({ commit }) {
      const res = await axios.get('/api/gradovi/svi')
      commit('setSveGradove', res.data)
      return res.data
    },
    async getRandomRestorane({commit}) {
      const res = await axios.get('/api/gradovi/restorani/random')
      commit('setRandomRestorane', res.data)
    },
    async getQuotes({ commit }){
      const res = await axios.get('/api/quotes')
      commit('setQuote', res.data)
    },
    async getRestoran({ commit }) {
      const slug = router.currentRoute.value.params.slug
      const res = await axios.get(`/api/restoran/${slug}`)
      commit('setRestoran', res.data)
      return res.data
    },
    async getRestoranPoGradu( {commit} ) {
      const slug = router.currentRoute.value.params.slug
      const res = await axios.get(`/api/grad/${slug}`)
      commit('setRestoranPoGradu', res.data)
      return res.data
    },
    async getRandomRestoranPoGradu({ commit }) {
      const string = router.currentRoute.value.params.slug.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase()).split('-').join(' ')
      const res = await axios.get(`/api/grad/${string}/random`)
      commit('setRandomRestoranPoGradu', res.data)
    },
  },
  modules: {}
})
