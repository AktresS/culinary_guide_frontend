import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Categories from '@/components/Categories.vue';
import Recipes from '@/components/Recipes.vue';
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
];

const router = createRouter( {
    history: createWebHistory(),
    routes,
});

export default router;

