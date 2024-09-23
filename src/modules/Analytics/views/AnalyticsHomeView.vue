<template>
    <div>
      <HomePageComponent />
    </div>
  </template>
  <script>
  import { defineAsyncComponent, onMounted } from "vue";
  export default {
    components: {
      HomePageComponent: defineAsyncComponent(() =>
        import("../components/HomePageComponent.vue")
      ),
    },
  
    setup() {
      return {
        backgroundDiv: {
          backgroundImage:
            "https://cloudmediapro.com/wp-content/uploads/2021/05/contacto.svg",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        },
      };
    },
  };
  </script>
  <style>
  body {
  }
  </style>
  