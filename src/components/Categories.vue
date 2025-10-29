<template>
  <DataTable :value="categories"
             :lazy="true"
             :loading="dataStore.loading"
             :paginator="true"
             :rows="perpage"
             :rowsPerPageOptions="[2, 5, 10]"
             :totalRecords="categories_total"
             @page="onPageChange"
             responsive-layout="scroll"
             :first="offset"
  >
    <Column field="id" header="№"/>
    <Column field="name" header="Наименование категории"/>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore';
export default {
  name: "CategoriesPage",
  components: {DataTable, Column},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    categories() {
      return this.dataStore.categories;
    },
    categories_total() {
      return this.dataStore.categories_total;
    }
  },
  mounted() {
    console.log('Categories component MOUNTED!');
    console.log(import.meta.env);
    this.dataStore.get_categories();
    this.dataStore.get_categories_total();
    console.log('Categories=', this.categories);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_categories(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>

