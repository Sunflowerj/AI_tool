<template>
  <el-container class="layout-container">
    <el-aside
      :width="isSidebarOpen ? '260px' : '64px'"
      class="layout-aside transition-all"
    >
      <TheSidebar />
    </el-aside>

    <el-container class="main-wrapper">
      <TheHeader />
      <el-main class="layout-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useNoteStore } from '@/stores/note'; 
import TheHeader from '@/components/layout/TheHeader.vue';
import TheSidebar from '@/components/layout/TheSidebar.vue';

const store = useNoteStore();

// 响应式监听侧边栏状态
const isSidebarOpen = computed(() => store.isSidebarOpen);

// 参考你提供的 handleResize 逻辑
const handleResize = () => {
  if (window.innerWidth < 900 && store.isSidebarOpen) {
    store.toggleSidebar(false);
  } else if (window.innerWidth >= 900 && !store.isSidebarOpen) {
    store.toggleSidebar(true);
  }
};

onMounted(() => window.addEventListener('resize', handleResize));
onUnmounted(() => window.removeEventListener('resize', handleResize));
</script>

<style scoped>
.layout-container {
  height: 100vh;
}
.layout-aside {
  border-right: 1px solid #f0f0f0;
  background: #fff;
  overflow-x: hidden;
}
.main-wrapper {
  display: flex;
  flex-direction: column;
}
.layout-main {
  background-color: #f5f7fa;
  padding: 0;
  /* height: 100%; */
  overflow: hidden;
}
.transition-all {
  transition: width 0.3s ease;
}
/* 过渡动画 */
.fade-transform-enter-active, .fade-transform-leave-active {
  transition: all 0.2s;
}
.fade-transform-enter-from { opacity: 0; transform: translateX(-10px); }
.fade-transform-leave-to { opacity: 0; transform: translateX(10px); }
</style>