<template>
  <Menubar :model="items">
    <template #start>
      <span>
        <img src="@/assets/logo.svg" width="70" alt="My svg Icon"/>
      </span>
    </template>

    <template #item="{ item }">
      <router-link v-if="item.route" :to="item.route" class="flex items-center gap-2 p-2 rounded-lg">
        <span :class="item.icon"/>
        <span class="ml-1">{{ item.label }}</span>
      </router-link>
    </template>

    <template #end>
      <div class="flex items-center gap-2">
        <div v-if="isAuthenticated && user">
          <span class="pi pi-fw pi-user mr-4"/> {{ user.name }}
          <PrimeButton @click="logout" class="ml-4">Выйти</PrimeButton>
        </div>
        <div v-else>
          <form @submit.prevent="login">
            <InputText v-model="email" type="email" id="email" required placeholder="Логин" class="m-2 sm:w-auto"
              :class="{'p-invalid': authError}"/>
            <InputText v-model="password" type="password" id="password" required placeholder="Пароль"
              class="m-2 sm:w-auto" :class="{'p-invalid': authError}"/>
            <PrimeButton type="submit">Войти</PrimeButton>
            <div class="ml-2"><small v-if="authError" class="error">{{authError}}</small></div>
          </form>
        </div>
      </div>

    </template>
  </Menubar>
  <router-view/>
</template>

<script>
import { useAuthStore } from '@/stores/authStore.js';
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";

export default {
  components: {PrimeButton: Button, Menubar, InputText},
  data(){
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        {
          label: 'Главная страница',
          icon: 'pi pi-fw pi-home',
          route: '/',
          shortcut: 'Ctrl + H',
        },
        {
          label: 'Категории',
          icon: 'pi pi-fw pi-folder',
          route: '/categories',
        },
        {
          label: 'Рецепты',
          icon: 'pi pi-fw pi-list',
          route: '/recipes',
        },
      ],
    };
  },
  computed: {
    isAuthenticated(){
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
    authError(){
      return this.authStore.errorMessage;
    },
  },
  methods: {
    logout() {
      this.authStore.logout();
    },
    login() {
      this.authStore.login({email: this.email, password: this.password});
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  },
};
</script>

<style scoped>
.error {
  color: red;
}

:deep(.p-menubar-root-list) {
  display: flex; /* на всякий случай */
  gap: 50px;
  margin-left: 40px;
}
</style>





