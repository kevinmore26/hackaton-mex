<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
<style lang="scss">
// .tblData tbody tr:hover {
//   background-color: var(--q-primary) !important;
//   transition: all 0.5s !important;
//   color: white !important;
// }
// .tblData .q-item:hover {
//   transition: all 0.5s !important;
//   color: white;
// }
// .tblData tbody tr:not(:hover) {
//   background-color: white;
//   transition: all 0.2s !important;
//   color: var(--q-primary) !important;
// }
// .tblData .q-btn:hover {
//   background-color: white;
//   transition: all 0.5s !important;
//   color: $primary;
// }
.textBasicMonserrat {
  font-family: "Montserrat" !important;
  font-size: 28px;
  font-weight: 700;
  line-height: 0.9em;
  letter-spacing: -1px;
  color: #0e134f;
}
.textBasicMonserrat2 {
  font-family: "Montserrat" !important;
  line-height: 1.1em !important;
  letter-spacing: 0px !important;
  color: #0e134f !important;
}
.textBasicMonserrat3 {
  font-family: "Montserrat" !important;
  line-height: 1.1em !important;
  letter-spacing: 0px !important;
  font-weight: 500;
  line-height: 0.9em;
  letter-spacing: -1px;
  color: #0e134f; 
}
.textoMonserrat {
  text-align: center;
  color: #ffffff;
  font-weight: 600;
  line-height: 1em;
  letter-spacing: -0.2px;
  font-family: "Montserrat", sans-serif;
}
.my-sticky-header-column-table tr th {
  position: sticky;
  /* higher than z-index for td below */
  z-index: 2;
  /* bg color is important; just specify one */
}
.my-sticky-header-column-table thead tr:last-child th {
  /* height of all previous header rows */
  top: 48px;
  /* highest z-index */
  z-index: 3;
}
.my-sticky-header-column-table thead tr:last-child th {
  top: 0;
  z-index: 1;
}
.my-sticky-header-column-table tr:last-child th:last-child {
  /* highest z-index */
  z-index: 3;
}
.my-sticky-header-column-table td:last-child {
  z-index: 1;
}
.my-sticky-header-column-table td:last-child,
.my-sticky-header-column-table th:last-child {
  position: sticky;
  right: 0;
}
</style>
