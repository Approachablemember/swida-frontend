# Installation

## 1. Clone the repository

```bash
git clone https://github.com/Approachablemember/swida-frontend.git
cd swida-frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Run development server

```bash
npm run dev
```

## 4. Open browser at

```arduino
http://localhost:5173
```

### Note: 

Backend server is allowing requests only from http://localhost:5173 address

In case your Frontend application is running on another address, make sure to change CORS_ALLOWED_ORIGINS value in swida_backend/swida_backend/settings.py

Make sure that Backend server is running on http://localhost:8000/ . If not, please make sure to change base url in swida-frontend/src/api/index.ts

# Assumptions & Decisions

Vue 3 Composition API + TypeScript used for better reusability and type safety.

Basic styling with scoped CSS (no Tailwind to avoid extra setup complexity).

Validations are minimal — more can be added with a form library like Vuelidate if needed.

# Things to change:

Order ID should be calculated on backend in form: 2025xxxxxxx1

Customer Name should be provided by the backend and on the UI it should be as input with select dropdown.

Destinations (locations/addresses) should be provided by the backend. Once you selected Pick-Up customer, in database there should be table or at least column with customer's locations and addresses. So when User chose the customer and is selecting location, they are (locations and addresses) should be provided as dropdown and in case User choose location, it should automaticaly set address as well, same in opposite side. In case this is a new destination or for example we have situation when another car was delivering this Order and car broke and Pick-Up point is somewhere on the road, in this case User will need to input address manualy.

Order Creation should have a "copy" button in case of regular transportations

For tables on UI we can use good framework - DevExtreme by DevExpress (it is available in JQuery, Vue, React, Angular).

Pagination should be added. It was not mentioned in test task, but it MUST be implemented.

## Note:

All things described above were from my point of view as Disponent (I was working as one of them) and of course as Software Developer
