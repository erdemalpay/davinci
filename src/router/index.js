import Vue from 'vue';
import Router from 'vue-router';
import Games from '@/components/Games';
import AddGame from '@/components/AddGame';
import Tables from '@/components/Tables';
import Table from '@/components/Table';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/games',
      name: 'Games',
      component: Games,
    },
    {
      path: '/games/add',
      name: 'AddGame',
      component: AddGame,
    },
    {
      path: '/',
      name: 'Tables',
      component: Tables,
    },
    {
      path: '/table/:id',
      name: 'Table',
      component: Table,
    },
  ],
});
