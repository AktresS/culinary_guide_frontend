<script setup>
import { ref, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useDataStore } from '@/stores/dataStore';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

// Состояния
const toast = useToast();
const loading = ref(false);
const dataStore = useDataStore();

const mainImagePreview = ref(null);
const mainImageFile = ref(null);
const mainImageInput = ref(null);
const stepImageInputs = ref([]);

// Форма
const form = reactive({
  name: '',
  category_id: '',
  cooking_time: null,
  steps: [
    { description: '', timer_duration: null, image: null, imagePreview: null }
  ]
});

// Заглушка категорий (в реальности загружай с API)
const categories = ref([
  { id: 1, name: 'Основные блюда' },
  { id: 2, name: 'Салаты' },
  { id: 3, name: 'Десерты' },
  { id: 4, name: 'Супы' }
]);

// Методы
const onMainImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    mainImageFile.value = file;
    mainImagePreview.value = URL.createObjectURL(file);
  }
};

const onStepImageChange = (event, index) => {
  const file = event.target.files[0];
  if (file) {
    form.steps[index].image = file;
    form.steps[index].imagePreview = URL.createObjectURL(file);
  }
};

const addStep = () => {
  form.steps.push({ description: '', timer_duration: null, image: null, imagePreview: null });
};

const removeStep = (index) => {
  if (form.steps.length > 1) {
    form.steps.splice(index, 1);
  }
};

const removeMainImage = () => {
  mainImageFile.value = null;
  mainImagePreview.value = null;
  if (mainImageInput.value) {
    mainImageInput.value.value = '';
  }
};

const removeStepImage = (index) => {
  form.steps[index].image = null;
  form.steps[index].imagePreview = null;
  if (stepImageInputs.value[index]) {
    stepImageInputs.value[index].value = '';
  }
};

const submitDish = async () => {
  if (!mainImageFile.value) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Загрузите главное изображение', life: 3000 });
    return;
  }

  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('category_id', form.category_id);
  formData.append('cooking_time', form.cooking_time);
  formData.append('main_image', mainImageFile.value);

  // Добавляем шаги
  form.steps.forEach((step, index) => {
    formData.append(`steps[${index}][description]`, step.description);
    if (step.timer_duration) {
      formData.append(`steps[${index}][timer_duration]`, step.timer_duration);
    }
    if (step.image) {
      formData.append(`steps[${index}][image]`, step.image);
    }
  });

  loading.value = true;
    await dataStore.create_dishes(formData);
    if (dataStore.errorCode === 0) {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Блюдо создано!',
        life: 3000
      });
    }else {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: dataStore.errorMessage,
        life: 5000
      });
    }


    loading.value = false;

};
</script>

<template>
  <div class="create-dish p-6 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Создать новое блюдо</h2>

    <form @submit.prevent="submitDish" enctype="multipart/form-data">
      <!-- Название -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Название блюда *</label>
        <InputText
          v-model="form.name"
          class="w-full"
          placeholder="Например: Паста Карбонара"
        />
      </div>

      <!-- Категория -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Категория *</label>
        <select v-model="form.category_id" class="w-full p-2 border rounded">
          <option value="">Выберите категорию</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Время приготовления -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Время приготовления (в минутах) *</label>
        <InputNumber
          v-model="form.cooking_time"
          class="w-full"
          :min="1"
          placeholder="30"
        />
      </div>

      <!--Главное изображение-->
      <div class="mb-6">
        <label class="block text-sm font-medium mb-1">Главное изображение *</label>
        <input
          ref="mainImageInput"
          type="file"
          @change="onMainImageChange"
          accept="image/jpeg,image/png,image/jpg,image/gif"
          class="w-full"

        />
        <img
          v-if="mainImagePreview"
          :src="mainImagePreview"
          alt="Главное изображение"
          class="mt-2 w-32 h-32 object-cover rounded"
        />
        <Button
          type="button"
          @click="removeMainImage"
          icon="pi pi-trash"
          class="p-button-text p-button-danger"
          size="small"
        />
      </div>

      <!-- Шаги приготовления -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-semibold">Шаги приготовления *</h3>
          <Button
            type="button"
            icon="pi pi-plus"
            label="Добавить шаг"
            @click="addStep"
            size="small"
          />
        </div>

        <div v-for="(step, index) in form.steps" :key="index">
          <div class="flex justify-between items-start">
            <h4 class="font-medium mb-2">Шаг {{ index + 1 }}</h4>
            <Button
              type="button"
              icon="pi pi-trash"
              class="p-button-text p-button-danger"
              @click="removeStep(index)"
              size="small"
            />
          </div>

          <div class="mb-3">
            <label class="block text-sm mb-1">Описание *</label>
            <Textarea
              v-model="step.description"
              rows="3"
              class="w-full"
            />
          </div>

          <div class="mb-3">
            <label class="block text-sm mb-1">Таймер (минуты)</label>
            <InputNumber
              v-model="step.timer_duration"
              :min="1"
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm mb-1">Изображение шага (опционально)</label>
            <input
              :ref="el => stepImageInputs[index] = el"
              type="file"
              @change="(e) => onStepImageChange(e, index)"
              accept="image/jpeg,image/png,image/jpg,image/gif"
              class="w-full"
            />
            <img
              v-if="step.imagePreview"
              :src="step.imagePreview"
              alt="Изображение шага"
              class="mt-2 w-24 h-24 object-cover rounded"
            />
            <Button
              type="button"
              @click="removeStepImage(index)"
              icon="pi pi-trash"
              class="p-button-text p-button-danger"
              size="small"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        label="Создать блюдо"
        :loading="loading"
        class="w-full py-3"
      />
    </form>
  </div>
  <Toast position="bottom-right"/>
</template>

<style scoped>
  .create-dish {
    background-color: #18181b;
    border-radius: 8px;
  }
  input[type="file"] {
    cursor: pointer;
    background-color: #2a7d5f;
    border-radius: 4px;
  }
  option{
    background-color: #18181b;
    color: white;
  }
</style>
