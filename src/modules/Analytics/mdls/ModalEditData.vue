<template>
  <q-card style="margin: 0 auto">
    <div style="display: block; align-items: center; justify-content: left">
      <div style="display: block; margin-top: 10px" class="q-px-lg q-pt-none">
        <q-bar style="" class="bg-white q-px-none">
          <q-space></q-space>
          <q-btn color="primary" dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section
          class="row d-flex justify-left"
          style="padding-top: 0px; padding-bottom: 0px"
        >
          <p class="text-primary text-bold text-left" style="font-size: 32px">
            Scraping result
          </p>
        </q-card-section>
        <q-section class="col-md-3">
          <q-card-section class="row q-py-none">
            <!-- Sección de Imagen Principal -->
            <q-card-section class="col-md-12 col-xs-12 text-black q-pa-md" style="max-height: 100%;">
              <h5 class="text-black col-12"> Subcategoria: {{ subcategoria }}</h5>
              <a :href=url target="blank">{{ url }}</a>
              <q-section >
                <p> {{ textolimpio }}</p>
              </q-section>
            </q-card-section>
            <!-- Otras Secciones --> 
          </q-card-section>
        </q-section>
      </div>

      <q-card-actions class="col-12 row q-pa-md q-my-md" style="">
        <q-btn
          class="text-white col-md-5 col-xs-12 botones"
          type="submit"
          rounded
          @click="changeplan"
          :loading="loading"
          style="background-color: rgb(84, 105, 212); max-width: 300px"
        >
          Save
        </q-btn>
        <q-btn
          class="col-md-5 col-xs-12 botones"
          type="submit"
          rounded
          v-close-popup
          style="
            background-color: white;
            border: 1px solid rgb(84, 105, 212);
            color: rgb(84, 105, 212);
            max-width: 300px;
          "
        >
          Cancel
        </q-btn>
      </q-card-actions>
    </div>
  </q-card>
</template>

<script>
import { ref, defineAsyncComponent, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import {
  setCssVar,
  Quasar,
  LocalStorage,
  SessionStorage,
  QSpinnerGears,
  useQuasar,
} from "quasar";
import useUI from "../../../composables/useUI";
//updatePlanEcwid
export default {
  props: {
    pMensaje: {},
  },
  emits: ["aceptar", "editar"],

  setup(props, context) {
    const modal = ref(true);
    const planSelected = ref(props.pMensaje.planName);
    const planPeriod = ref("");
    const infoTienda = ref([]);
    const loading = ref(false);
    const defaultName = ref(props.pMensaje.name);
    const defaultprice = ref(props.pMensaje.price);
    const otherprice = ref(props.pMensaje.precio_profit);
    const images = ref(props.pMensaje.images);
    const router = useRouter();
    const disabledRadio = ref(false);
    const infoCategoriaGET = ref([]);
    const modificarCategoriaID = ref([]);
    const allCategoriaInfo = ref([]);
    const infopMensaje = ref(props.pMensaje);
    const textolimpio = ref("")
    const url = ref("")
    const subcategoria = ref("")
    const { updateCategoriaScrap, obtenerCategoriaID } = useUI();
    console.log(props.pMensaje);
    onMounted(async () => {
      console.log(props.pMensaje .clean_text)
      textolimpio.value = props.pMensaje .clean_text
      url.value = props.pMensaje .url
      subcategoria.value = props.pMensaje .subposiblecategorie
    });

    return {
      obtenerCategoriaID,
      url,
      subcategoria,
      modificarCategoriaID,
      textolimpio,
      allCategoriaInfo,
      infoTienda,
      defaultName,
      defaultprice,
      otherprice,
      modal,
      loading,
      infoCategoriaGET,
      planPeriod,
      planSelected,
      disabledRadio,
      infopMensaje,
      images,
      router,
      visibleColumns2: ref([
        {
          label: "CLOUDMEDIAPRO_FREEDEMO",
          value: "CLOUDMEDIAPRO_FREEDEMO",
        },
        {
          label: "CLOUDMEDIAPRO_VENTURE_GOLD",
          value: "CLOUDMEDIAPRO_VENTURE_GOLD",
        },
        {
          label: "CLOUDMEDIAPRO_BUSINESS_GOLD",
          value: "CLOUDMEDIAPRO_BUSINESS_GOLD",
        },
        {
          label: "CLOUDMEDIAPRO_UNLIMITED_GOLD",
          value: "CLOUDMEDIAPRO_UNLIMITED_GOLD",
        },
      ]),

      watchplanselected() {
        console.log(planSelected.value);
        if (planSelected.value == "CLOUDMEDIAPRO_FREEDEMO") {
          disabledRadio.value = true;
        } else {
          disabledRadio.value = false;
        }
      },
      continuar() {
        router.push("/login/resetpass");
      },
      changeplan: async () => {
        loading.value = true;
        console.log(infopMensaje.value);
        console.log(modificarCategoriaID.value);
        for (let i = 0; i < modificarCategoriaID.value.length; i++) {
          if (modificarCategoriaID.value[i].id == infopMensaje.value.id) {
            modificarCategoriaID.value[0].name = defaultName.value;
            modificarCategoriaID.value[0].price = defaultprice.value;
            console.log(
              modificarCategoriaID.value[0],
              "modificarCategoriaID.value[0]"
            );
          }
        }
        infoTienda.value = LocalStorage.getItem("tiendaseleccionada");
        const resp = await updateCategoriaScrap(infopMensaje.value.idPadre, {
          data: {
            categorieName: allCategoriaInfo.value.categorieName,
            categoriecontent: modificarCategoriaID.value, 
          },
        });
        context.emit("editar");
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
.botones {
  border-radius: 5px;
  margin: 0 auto;
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
