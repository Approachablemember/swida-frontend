import { createRouter, createWebHistory } from "vue-router";
import OrderList from "../views/OrderList.vue";
import CreateOrder from "../views/CreateOrder.vue";

const routes = [
  { path: "/", name: "list", component: OrderList },
  { path: "/create", name: "create", component: CreateOrder },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
