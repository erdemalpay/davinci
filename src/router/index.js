import Vue from 'vue';
import Router from 'vue-router';
import Games from '@/components/Games';
import AddGame from '@/components/AddGame';
import Tables from '@/components/Tables';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Games',
      component: Games,
    },
    {
      path: '/games/add',
      name: 'AddGame',
      component: AddGame,
    },
    {
      path: '/tables',
      name: 'Tables',
      component: Tables,
    },
  ],
});
