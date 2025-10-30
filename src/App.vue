<script setup lang="ts">
  import { onBeforeMount, computed } from 'vue';
  import { useStore } from '@/stores/store';
  import MainRoom from './components/MainRoom.vue';
  const store = useStore()

  const selectedRoom = computed(() => store.getSelectedRoom)
  const getShapeType = computed(() => {
    switch (selectedRoom.value?.walls.length) {
      case 3:
        return 'Triangle'
      case 4:
        return 'Square'
      default:
        return 'T-shape'
    }
  })
  onBeforeMount(async () => {
    await store.fetchData()

    await store.selectRandomRoom()
  })
</script>

<template>
  <header>
    <div class="header-title">
      <h1>Docusketch</h1>
    </div>
  </header>

  <main class="main-container">
    <div class="shape-container">
      <MainRoom v-if="selectedRoom" :room="store.getSelectedRoom">
        <template #title>
          {{ getShapeType }}
        </template>
      </MainRoom>
    </div>
    <button class="random-room-button" @click="store.selectRandomRoom">Select Random Room</button>
  </main>
</template>

<style>
  .header-title{
    font-size: 24px;
    font-weight: bold;
    color: #000;
    text-align: center;
    margin: 20px 0;
  }

  .shape-container{
    margin-top: 40px;
    border: 5px solid #000;
    border-radius: 10px;
    padding: 20px;
    width: 800px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    flex-direction: column;
  }

  .main-container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .random-room-button{
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #000;
    background-color: #fff;
    color: #000;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    width: 220px;
  }
</style>
