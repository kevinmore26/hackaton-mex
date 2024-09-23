<template>
  <q-card style="display: flex">
    <div
      style="
        display: block;
        align-items: center;
        justify-content: center;
        margin: 25px 10px;
      "
    >
      <div style="display: block">
        <q-card-section class="q-px-sm q-py-none">
          <Vue3Lottie :animationData="Questionboy" :height="100" :width="100" />
        </q-card-section>
        <q-card-section
          class="row items-center q-px-sm q-py-none"
          style="margin-left: 17px"
        >
          <p
            class="q-ml-sm text-primary text-bold text-center"
            style="
              font-size: 20px;
              padding-right: 30px;
              padding-top: 8px;
              color: rgb(2, 38, 58);
            "
          >
            ¿Quieres eliminar este producto sin subir?
          </p>
        </q-card-section>
        <q-card-section class="row items-center q-px-sm q-py-none text-center">
          <p
            class="q-ml-sm text-primary text-bold text-center"
            style="font-size: 15px; color: rgb(2, 38, 58); margin: 0 auto"
          >
            Esta acción no es reversible
          </p>
        </q-card-section>
      </div>

      <q-card-actions class="row q-pa-md q-py-none" style="margin-top: 20px">
        <div
          class="col-md-6 q-pa-xs col-xs-6"
          style="margin: 0 auto; display: flex"
        >
          <q-btn
            class="text-white col-12"
            @click="eliminar"
            :loading="loading"
            type="submit"
            style="
              margin: 0 auto;
              background-color: rgb(84, 105, 212);
              padding: 10px 20px;
              border-radius: 5px;
            "
          >
            Eliminar
          </q-btn>
        </div>
        <div
          class="col-md-6 q-pa-xs col-xs-6"
          style="margin: 0 auto; display: flex"
        >
          <q-btn
            class="text-primary col-12"
            v-close-popup
            type="submit"
            style="
              margin: 0 auto;
              border: 1px solid rgb(84, 105, 212);
              padding: 10px 20px;
              background-color: white;
              border-radius: 5px;
            "
          >
            Cancelar
          </q-btn>
        </div>
      </q-card-actions>
    </div>
  </q-card>
</template>

<script>
import { ref, defineAsyncComponent, onMounted, watch } from "vue";
import Questionboy from "./question.json";
import { Vue3Lottie } from "vue3-lottie";
import { useRouter } from "vue-router";
import useUI from "../../../composables/useUI";
export default {
  components: {
    Vue3Lottie,
  },
  props: {
    pMensaje: {},
    pOtro: {},
  },
  emits: ["aceptar", "eliminar"],
  setup(props, context) {
    const modal = ref(true);
    const router = useRouter();
    const categoriasStrapiCOPY = ref([]);
    const loading = ref(false);
    const {
      isCarrito,
      eliminarEnCarrito,
      deleteStoreEcwid,
      obtenerCategoriaStrapi,
      updateCategoriaScrap,
    } = useUI();
    console.log(props);
    return {
      modal,
      Questionboy,
      router,
      loading,
      obtenerCategoriaStrapi,
      categoriasStrapiCOPY,
      eliminar: async () => {
        loading.value = true;
        context.emit("eliminar");
        loading.value = false;
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.q-avatar {
  border-radius: 0% !important;
}
.q-px-sm {
  padding-left: 0% !important;
  padding-right: 0% !important;
}

@media (min-width: 1440px) {
}
@media screen and (min-width: 1240px) and (max-width: 1473px) {
}
@media screen and (min-width: 1024px) and (max-width: 1240px) {
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
}
</style>
