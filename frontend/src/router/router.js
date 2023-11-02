import { createRouter, createWebHistory } from 'vue-router'
import Pocetna from '@/components/Pocetna.vue'
import Onama from '@/components/Onama.vue'
import Kontakt from '@/components/Kontakt.vue'
import Prijava from '@/components/Prijava/Prijava.vue'
// import KorakDva from '@/components/Prijava/KorakDva.vue'
// import KorakTri from '@/components/Prijava/KorakTri.vue'
import Gradovi from '@/components/Gradovi.vue'
const Grad = () => import('@/components/Grad.vue')
// import Grad from '@/components/Grad.vue'
import Detaljno from '@/components/Detaljno.vue'
import NotFound from '@/components/NotFound.vue'
import KontaktAgenciju from '@/components/KontaktAgenciju.vue'
import Policy from '@/components/Policy.vue'
import Terms from '@/components/Terms.vue'


const routes = [
  {
    path: '/',
    name: 'pocetna',
    component: Pocetna
  },
  {
    path: '/onama',
    name: 'onama',
    component: Onama
  },
  {
    path: '/kontakt',
    name: 'kontakt',
    component: Kontakt
  },
  {
    path: '/kontakt/:slug',
    name: 'kontakt-agenciju',
    component: KontaktAgenciju
  },
  {
    path: '/prijava',
    name: 'prijava',
    component: Prijava,
    // children: [
    //   {
    //     path: 'drugi-korak',
    //     name: 'drugi-korak',
    //     component: KorakDva
    //   },
    //   {
    //     path: 'zadnji-korak',
    //     name: 'zadnji-korak',
    //     component: KorakTri
    //   }
    // ]
  },
  {
    path: '/gradovi',
    name: 'gradovi',
    component: Gradovi
  },
  {
    path: '/grad/:slug',
    name: 'grad',
    props: true,
    component: Grad,
  },
  {
    path: '/restoran/:slug',
    name: 'detaljno',
    component: Detaljno
  },
  {
    path: '/klopa/policy',
    name: 'policy',
    component: Policy
  },
  {
    path: '/klopa/terms',
    name: 'terms',
    component: Terms
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior () {
    document.getElementById('app').scrollIntoView();
  }
})


export default router
