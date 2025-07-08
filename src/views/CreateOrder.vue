<template>
  <div class="container">
    <h2 class="title">Create Transport Order</h2>

    <form @submit.prevent="submitOrder" class="form">
      <div class="form-group">
        <label>Order Number:</label>
        <input
          v-model.number="order.order_number"
          type="number"
          required
          class="input"
          min="1"
        />
      </div>

      <div class="form-group">
        <label>Customer Name:</label>
        <input v-model="order.customer_name" required class="input" />
      </div>

      <div class="form-group">
        <label>Date:</label>
        <input v-model="order.date" type="date" required class="input" />
      </div>

      <h3 class="subheading">Waypoints</h3>

      <div
        v-for="(wp, index) in waypoints"
        :key="index"
        class="waypoint-box"
      >
        <div class="form-group">
          <label>Location:</label>
          <input v-model="wp.location" class="input" required />
        </div>

        <div class="form-group">
          <label>Type:</label>
          <select v-model="wp.waypoint_type" class="input" required>
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>

        <button
          @click="removeWaypoint(index)"
          type="button"
          class="remove-btn"
        >
          Remove
        </button>
      </div>

      <button @click="addWaypoint" type="button" class="add-btn">
        Add Waypoint
      </button>

      <div>
        <button type="submit" class="submit-btn" :disabled="!isFormValid">Submit Order</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import api from '../api';
import type { Waypoint, TransportOrder } from '../types';

export default defineComponent({
  setup() {
    const order = reactive<TransportOrder>({
      order_number: 0,
      customer_name: '',
      date: '',
      waypoints: [],
    });

    const waypoints = reactive<Waypoint[]>([]);

    const addWaypoint = () => {
      waypoints.push({ location: '', address: '', waypoint_type: 'pickup' });
    };

    const removeWaypoint = (index: number) => {
      waypoints.splice(index, 1);
    };

    const isFormValid = computed(() => {
      if (
        !order.order_number ||
        isNaN(order.order_number) ||
        order.order_number <= 0 ||
        !order.customer_name.trim() ||
        !order.date.trim()
      ) {
        return false;
      }

      if (waypoints.length === 0) return false;

      if (!waypoints.every(wp => wp.location.trim() && wp.waypoint_type)) {
        return false;
      }

      const hasPickup = waypoints.some(wp => wp.waypoint_type === 'pickup');
      const hasDelivery = waypoints.some(wp => wp.waypoint_type === 'delivery');

      return hasPickup && hasDelivery;
    });

    const submitOrder = async () => {
      try {
        const payloadWaypoints = waypoints.map((wp) => ({
          location: wp.location,
          waypoint_type: wp.waypoint_type === 'pickup' ? 'PU' : 'DL',
        }));

        await api.post('orders/create/', {
          order_number: order.order_number,
          customer_name: order.customer_name,
          date: order.date,
          waypoints: payloadWaypoints,
        });

        alert('Order created!');
        order.order_number = 0;
        order.customer_name = '';
        order.date = '';
        waypoints.splice(0, waypoints.length);
      } catch (err) {
        console.error(err);
        alert('Failed to create order.');
      }
    };

    return { order, waypoints, addWaypoint, removeWaypoint, submitOrder, isFormValid };
  },
});
</script>


<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 16px;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input {
  padding: 6px 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 100%;
  box-sizing: border-box;
}

.subheading {
  margin-top: 24px;
  font-weight: 500;
  font-size: 1.2rem;
}

.waypoint-box {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 12px;
}

.remove-btn {
  margin-top: 6px;
  font-size: 0.85rem;
  color: #b91c1c;
  background: none;
  border: none;
  cursor: pointer;
}

.remove-btn:hover {
  text-decoration: underline;
}

.add-btn {
  font-size: 0.9rem;
  color: #2563eb;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.add-btn:hover {
  text-decoration: underline;
}

.submit-btn {
  background-color: #22c55e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.submit-btn:disabled {
  background-color: #808080;
}

.submit-btn:hover {
  background-color: #16a34a;
}

.submit-btn:disabled:hover {
  background-color: #A9A9A9;
}
</style>
