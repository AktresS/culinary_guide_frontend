<template>
  <div>
    <h1>Добро пожаловать в Culinary Guide</h1>
    <p>Это главная страница нашего кулинарного справочника.</p>
    <p>Выберите категорию или перейдите к рецептам.</p>

    <button @click="goToRecipes">Создать свой рецепт</button>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    goToRecipes() {
      this.$router.push("/recipes");
    }
  }
};
</script>

<style scoped>
h1 {
  color: #2c3e50;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #2a7d5f;
}
</style>
