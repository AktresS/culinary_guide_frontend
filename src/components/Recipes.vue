<script>
import { DataTable, Column,
  Image, Avatar } from 'primevue'
import {useDataStore} from '@/stores/dataStore';
export default {
  name: "DishesPage",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {DataTable, Column, Image, Avatar},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    dishes() {
      return this.dataStore.dishes;
    },
    dishes_total() {
      return this.dataStore.dishes_total;
    }
  },
  mounted() {
    console.log('Dishes component MOUNTED!');
    console.log(import.meta.env);
    this.dataStore.get_dishes();
    this.dataStore.get_dishes_total();
    console.log('Dishes=', this.dishes);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_dishes(this.offset / this.perpage, this.perpage);
    },
    getMainImageUrl(images) {
      const main = images?.find(img => img.is_main);
      return main ? main.path : null;
    }
  }
}
</script>
<template>
  <DataTable :value="dishes"
             :lazy="true"
             :loading="dataStore.loading"
             :paginator="true"
             :rows="perpage"
             :rowsPerPageOptions="[2, 5, 10]"
             :totalRecords="dishes_total"
             @page="onPageChange"
             responsive-layout="scroll"
             :first="offset"
  >
    <Column field="id" header="№"/>
    <Column field="category.name" header="Категория"/>
    <Column header="Изображение">
      <template #body="slotProps">
        <Image
          v-if="getMainImageUrl(slotProps.data.images)"
          :src="getMainImageUrl(slotProps.data.images)"
          :alt="slotProps.data.name"
          class="w-24 rounded"
          preview
        />
        <Avatar
          v-else
          icon="pi pi-times-circle"
          size="large"
        />
      </template>
    </Column>
    <Column field="name" header="Наименование блюда"/>
    <Column field="cooking_time" header="Время приготовления"/>
  </DataTable>
</template>



