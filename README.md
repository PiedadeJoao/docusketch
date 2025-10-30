### node verison
node = v22.17.0
npm = 10.9.2

## Project Setup
```sh
npm install
npm run dev
```

## Project Overview

Vue 3 with Composition API
State Management: Pinia

## File Structure & Responsibilities:

src/App.vue → Main component; fetches data and stores it in the Pinia store
src/components/Shape.vue → Component responsible for rendering the room and geometric figure
src/stores/store → Pinia store managing all the state, logic, and necessary data. Abstracting logic and data here keeps Vue components clean and focused on rendering