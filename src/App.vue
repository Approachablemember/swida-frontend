<template>
  <div class="page-main">
  <header>
    <h1>Transport Orders</h1>
    <nav>
      <router-link
        to="/"
        :class="{ active: isActiveRoute('/') }"
      >
        Orders
      </router-link>
      <router-link
        to="/create"
        :class="{ active: isActiveRoute('/create') }"
      >
        Create Order
      </router-link>
    </nav>
  </header>

  <main>
    <router-view />
  </main>
</div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const isActiveRoute = (path: string) => route.path === path;
</script>

<style scoped>
header {
  background-color: #f3f4f6;
  padding: 1rem 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

nav a:hover {
  background-color: #e5e7eb;
}

nav a.active {
  background-color: #ffffff;
  font-weight: 600;
  border: 1px solid #d1d5db;
}
  
main {
  padding: 1.5rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
}
.page-main {
  height: 100vh;
  width: 100vw;
}
</style>
