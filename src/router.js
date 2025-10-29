import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Categories from '@/components/Categories.vue';
import Recipes from '@/components/Recipes.vue';
import CreateDish from '@/components/CreateDish.vue';
const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/categories',
        component: Categories,
    },
    {
        path: '/recipes',
        component: Recipes,
    },
    {
      path: '/createDish',
      component: CreateDish,
    }
];

const router = createRouter( {
    history: createWebHistory(),
    routes,
});

export default router;

