import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/tickets',
    },
    {
      path: '/tickets',
      name: 'Tickets',
      component: () => import('./components/TicketList'),
    },
    {
      path: '/tickets/:id',
      name: 'Ticket Detail',
      component: () => import('./components/TicketDetail'),
      props: true,
    },
  ],
});
