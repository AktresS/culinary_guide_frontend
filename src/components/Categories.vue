<template>
  <div>
    <h1>Категории блюд</h1>
    <ul>
      <li>Супы</li>
      <li>Салаты</li>
      <li>Основные блюда</li>
      <li>Десерты</li>
      <li>Напитки</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CategoriesPage",
};
</script>

<style scoped>
h1 {
  color: #2c3e50;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
</style>
