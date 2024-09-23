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
        <q-bar style="" class="bg-white q-px-none">
          <q-space></q-space>
          <q-btn color="primary" dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="q-px-sm q-py-none">
          <Vue3Lottie :animationData="Questionboy" :height="100" :width="100" />
        </q-card-section>
        <q-card-section
          class="row items-center q-px-sm q-py-none"
          style="margin-left: 17px"
        >
          <p
            v-show="nuevoform"
            class="q-ml-sm text-primary text-bold text-center"
            style="
              font-size: 20px;
              padding-right: 30px;
              padding-top: 8px;
              color: rgb(2, 38, 58);
            "
          >
            Escriba el nombre de la nueva categoría
          </p>
          <p
            v-show="existenteform"
            class="q-ml-sm text-primary text-bold text-center"
            style="
              font-size: 20px;
              padding-right: 30px;
              padding-top: 8px;
              color: rgb(2, 38, 58);
            "
          >
            Seleccione una categoría existente
          </p>
          <p
            v-show="!ocultarbotones"
            class="q-ml-sm text-primary text-bold text-center"
            style="
              font-size: 20px;
              padding-right: 30px;
              padding-top: 8px;
              color: rgb(2, 38, 58);
            "
          >
            ¿Deseas crear una nueva categoría o incluir tus productos en una ya
            existente?
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

      <q-card-actions
        class="row q-pa-md q-py-none"
        style="margin-top: 20px"
        v-show="!ocultarbotones"
      >
        <div
          class="col-md-6 q-pa-xs col-xs-6"
          style="margin: 0 auto; display: flex"
        >
          <q-btn
            class="text-white col-12"
            @click="crearcategoria"
            :loading="loading"
            type="submit"
            style="
              margin: 0 auto;
              background-color: rgb(84, 105, 212);
              padding: 10px 20px;
              border-radius: 5px;
            "
          >
            Crear nueva categoría
          </q-btn>
        </div>
        <div
          class="col-md-6 q-pa-xs col-xs-6"
          style="margin: 0 auto; display: flex"
        >
          <q-btn
            class="text-primary col-12"
            @click="existentecategoria"
            type="submit"
            style="
              margin: 0 auto;
              border: 1px solid rgb(84, 105, 212);
              padding: 10px 20px;
              background-color: white;
              border-radius: 5px;
            "
          >
            Elegir una existente
          </q-btn>
        </div>
      </q-card-actions>
      <q-card-section>
        <div
          style="display: flex; justify-content: center"
          class="row"
          v-show="nuevoform"
        >
          <q-input
            dense
            borderless
            filled
            v-model="nombrecategorianueva"
            input-class="text-left"
            placeholder=""
            class="q-mr-md"
          >
          </q-input>
        </div>
        <div
          style="display: flex; justify-content: center"
          class="row"
          v-show="existenteform"
        >
          <q-select
            class="col-12"
            style="
              background-color: white;
              height: 100%;
              width: 200px;
              color: black;
            "
            v-model="selectedCategory"
            filled
            use-input
            input-debounce="0"
            outlined
            @filter="filterFn"
            dense
            :options="
              categories.map((category) => ({
                label: truncateText2(category.attributes.categorieName),
                id: category.id,
                categoriecontent: category.attributes.categoriecontent,
              }))
            "
            map-options
            @update:model-value="otrocategoryupdate(selectedCategory)"
          />
        </div>
      </q-card-section>
      <q-card-actions
        class="row q-pa-md q-py-none"
        style="margin-top: 20px"
        v-show="nuevoform || existenteform"
      >
        <div
          class="col-md-12 q-pa-xs col-xs-12"
          style="margin: 0 auto; display: flex"
        >
          <q-btn
            v-show="nuevoform"
            class="text-white col-12"
            @click="crearnuevacategoriaemit"
            :loading="loading"
            type="submit"
            style="
              margin: 0 auto;
              background-color: rgb(84, 105, 212);
              padding: 10px 20px;
              border-radius: 5px;
            "
          >
            Crear nueva categoría
          </q-btn>
        </div>
        <div
          class="col-md-12 q-pa-xs col-xs-12"
          style="margin: 0 auto; display: flex"
        >
          <q-btn
            v-show="existenteform"
            class="text-white col-12"
            @click="crearexistentecategoriaemit"
            type="submit"
            style="
              margin: 0 auto;
              background-color: rgb(84, 105, 212);
              padding: 10px 20px;
              border-radius: 5px;
            "
          >
            Añadir a categoría existente
          </q-btn>
        </div>
      </q-card-actions>
    </div>
  </q-card>
</template>

<script>
import { ref, defineAsyncComponent, onMounted, watch } from "vue";
import {
  setCssVar,
  Quasar,
  LocalStorage,
  SessionStorage,
  QSpinnerGears,
  useQuasar,
} from "quasar";
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
  methods: {
    truncateText2(text) {
      const words = text.split(" ");
      if (words.length > 4) {
        return words.slice(0, 4).join(" ") + "...";
      }
      return text;
    },
  },
  setup(props, context) {
    const modal = ref(true);
    const ocultarbotones = ref(false);
    const nuevoresp = ref([]);
    const nombrecategorianueva = ref("");
    const existenteform = ref(false);
    const nuevoform = ref(false);
    const selectedCategory = ref(null);
    const categories = ref([]);
    const router = useRouter();
    const categoriasStrapiCOPY = ref([]);
    const infoexistentecategoria = ref([]);
    const loading = ref(false);

    const infoTienda = ref([]);
    const {
      isCarrito,
      eliminarEnCarrito,
      deleteStoreEcwid,
      obtenerCategoriaStrapi,
      updateCategoriaScrap,
    } = useUI();
    console.log(props);
    onMounted(async () => {
      loading.value = true;
      const resp = await obtenerCategoriaStrapi();
      // console.log(resp);
      infoTienda.value = LocalStorage.getItem("tiendaseleccionada");
      // console.log(infoTienda.value, "infotienda");
      for (let i = 0; i < resp.length; i++) {
        if (resp[i].attributes.storeName == infoTienda.value.nombreTienda) {
          categories.value.push(resp[i]);
        }
      }
      nuevoresp.value = categories.value;
      loading.value = false;
    });

    return {
      modal,
      nuevoresp,
      ocultarbotones,
      existenteform,
      selectedCategory,
      nombrecategorianueva,
      nuevoform,
      categories,
      infoTienda,
      Questionboy,
      router,
      loading,
      obtenerCategoriaStrapi,
      categoriasStrapiCOPY,
      //NUEVO
      crearnuevacategoriaemit: async () => {
        loading.value = true;
        let status = "crear";
        context.emit("aceptar", status, nombrecategorianueva.value);
        loading.value = false;
      },
      //EXISTENTE
      crearexistentecategoriaemit: async () => {
        loading.value = true;
        let status = "existente";
        context.emit("aceptar", status, infoexistentecategoria.value);
        loading.value = false;
      },

      crearcategoria: async () => {
        loading.value = true;
        ocultarbotones.value = true;
        // let status = "crear";
        nuevoform.value = true;
        // context.emit("aceptar", status);
        loading.value = false;
      },
      existentecategoria: async () => {
        loading.value = true;
        existenteform.value = true;
        ocultarbotones.value = true;
        // let status = "actualizar";
        // context.emit("aceptar", status);
        loading.value = false;
      },
      otrocategoryupdate: async (info) => {
        console.log(info, "info");
        infoexistentecategoria.value = info;
      },
      eliminar: async () => {
        loading.value = true;
        console.log(props.pMensaje.id);
        //DESCOMENTAR
        const categoriasStrapi = await obtenerCategoriaStrapi();
        categoriasStrapiCOPY.value = categoriasStrapi;
        for (let i = 0; i < categoriasStrapi.length; i++) {
          if (categoriasStrapi[i].id == props.pOtro) {
            console.log("holaaa", categoriasStrapi[i]);

            let filteredCategory = null;

            categoriasStrapi[i].attributes.categoriecontent.forEach(
              (content) => {
                if (content.id === props.pMensaje.id) {
                  filteredCategory = categoriasStrapi[i];
                  console.log(filteredCategory);
                  console.log("entrandooo");
                  console.log(content);
                  categoriasStrapi[i].attributes.categoriecontent.splice(
                    categoriasStrapi[i].attributes.categoriecontent.indexOf(
                      content
                    ),
                    1
                  );
                  // Eliminar el campo 'id' del elemento coincidente
                }

                // Imprimir filteredCategory después de la modificación
                console.log(
                  "filteredCategory después de la modificación:",
                  filteredCategory
                );
              }
            );

            const resp = await updateCategoriaScrap(filteredCategory.id, {
              data: {
                categorieName: filteredCategory.categorieName,
                categoriecontent: filteredCategory.attributes.categoriecontent,
              },
            });
          }
        }
        context.emit("aceptar");
        loading.value = false;
      },
      filterFn(val, update) {
        if (val === "") {
          update(() => {
            categories.value = nuevoresp.value;
          });
          return;
        } else {
          update(() => {
            categories.value = nuevoresp.value;
          });
        }

        update(() => {
          console.log(categories.value);
          const needle = val.toLowerCase();
          categories.value = categories.value.filter((category) =>
            category.attributes.categorieName.toLowerCase().includes(needle)
          );
          console.log(categories.value, "despues");
        });
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
