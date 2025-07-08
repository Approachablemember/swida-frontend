<template>
    <div class="container">
      <h2 class="title">Transport Orders</h2>
  
      <div class="filters">
        <input
          v-model="filters.order_number"
          placeholder="Filter by Order Number"
          type="number"
          class="filter-input"
          @input="fetchOrders"
        />
        <input
          v-model="filters.customer_name"
          placeholder="Filter by Customer"
          class="filter-input"
          @input="fetchOrders"
        />
        <input
          v-model="filters.date"
          placeholder="Filter by Date"
          type="date"
          class="filter-input"
          @change="fetchOrders"
        />
      </div>
  
      <table class="order-table">
        <thead>
          <tr>
            <th @click="sortBy('order_number')" class="clickable">
              Order #
              <span>{{ sortField === 'order_number' ? (sortDirection === 'asc' ? '▲' : '▼') : '' }}</span>
            </th>
            <th @click="sortBy('customer_name')" class="clickable">
              Customer
              <span>{{ sortField === 'customer_name' ? (sortDirection === 'asc' ? '▲' : '▼') : '' }}</span>
            </th>
            <th @click="sortBy('date')" class="clickable">
              Date
              <span>{{ sortField === 'date' ? (sortDirection === 'asc' ? '▲' : '▼') : '' }}</span>
            </th>
            <th>Waypoints</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.order_number }}</td>
            <td>{{ order.customer_name }}</td>
            <td>{{ order.date }}</td>
            <td>
              <ul>
                <li v-for="(wp, idx) in order.waypoints" :key="idx">
                  {{ wp.waypoint_type === 'PU' ? 'PICKUP' : 'DELIVERY' }} – {{ wp.location }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import api from '../api';
import type { TransportOrder } from '../types';
  
  export default defineComponent({
    setup() {
      const orders = ref<TransportOrder[]>([]);
      const filters = ref({
        customer_name: '',
        order_number: '',
        date: '',
      });
  
      const sortField = ref('order_number');
      const sortDirection = ref<'asc' | 'desc'>('asc');
  
      const fetchOrders = async () => {
        try {
          const params: Record<string, string> = {};
  
          if (filters.value.customer_name) {
            params['customer_name'] = filters.value.customer_name;
          }
          if (filters.value.order_number) {
            params['order_number'] = filters.value.order_number;
          }
          if (filters.value.date) {
            params['date'] = filters.value.date;
          }
  
          params['ordering'] = (sortDirection.value === 'asc' ? '' : '-') + sortField.value;
  
          const response = await api.get('orders/', { params });
          orders.value = response.data;
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        }
      };
  
      const sortBy = (field: string) => {
        if (sortField.value === field) {
          sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
        } else {
          sortField.value = field;
          sortDirection.value = 'asc';
        }
        fetchOrders();
      };
  
      fetchOrders();
  
      return {
        orders,
        filters,
        sortBy,
        sortField,
        sortDirection,
        fetchOrders,
      };
    },
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 700px;
    margin: 20px auto;
    padding: 16px;
    font-family: Arial, sans-serif;
  }
  
  .title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 16px;
  }
  
  .filters {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .filter-input {
    padding: 6px 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .order-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .order-table th,
  .order-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  
  .order-table th {
    background-color: #f5f5f5;
  }
  
  .order-table ul {
    margin: 0;
    padding-left: 18px;
  }
  
  .order-table li {
    margin-bottom: 4px;
  }
  
  .clickable {
    cursor: pointer;
    user-select: none;
  }
  
  .clickable:hover {
    text-decoration: underline;
  }
  </style>
  