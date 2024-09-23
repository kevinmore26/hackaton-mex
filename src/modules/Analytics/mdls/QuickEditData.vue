<template>
  <q-section style="margin: 0 auto">
    <div
      class="contenedorcard"
      style="display: block; align-items: center; justify-content: left"
    >
      <div style="display: block; margin-top: 10px" class="q-px-lg q-pt-none">
        <q-card-section
          class="row d-flex justify-left"
          style="padding-top: 0px; padding-bottom: 0px"
        >
          <p class="text-primary text-bold text-left" style="font-size: 22px">
            Quick edit
          </p>
          <p
            class="text-primary text-bold text-left"
            style="font-size: 14px"
          ></p>
        </q-card-section>
        <q-card-section class="row q-py-none">
          <q-section class="col-12 text-black">
            <p style="font-size: 18px"></p>
          </q-section>
        </q-card-section>
        <q-card-section class="row q-py-none">
          <q-section class="col-md-6 q-my-md col-xs-12 text-grey">
            <div class="col-12 col-sm-12 col-md-12">
              <div class="text-gray">Name</div>
              <!-- <q-input class="col-8" v-model="sede.sede" :dense="dense" /> -->
              <q-input
                dense
                borderless
                v-model="infoQuick.name"
                filled
                input-class="text-left"
                placeholder=""
                class="q-mr-md"
              >
              </q-input>
            </div>
          </q-section>
          <q-section class="col-md-6 q-my-md col-xs-12 text-grey">
            <div class="col-12 col-sm-12 col-md-12">
              <div class="text-gray">Description</div>
              <!-- <q-input class="col-8" v-model="sede.sede" :dense="dense" /> -->
              <q-input
                dense
                borderless
                v-model="infoQuick.full_description"
                filled
                input-class="text-left"
                placeholder=""
                class="q-mr-md"
              >
              </q-input>
            </div>
          </q-section>
          <q-section class="col-md-6 q-my-md col-xs-12 text-grey">
            <div class="col-sm-12 col-md-6">
              <div class="text-gray">Price</div>
              <!-- <q-input class="col-8" v-model="sede.sede" :dense="dense" /> -->
              <q-input
                dense
                borderless
                filled
                v-model="infoQuick.defaultPrice"
                input-class="text-left"
                placeholder=""
                class="q-mr-md"
              >
              </q-input>
            </div>
          </q-section>
          <q-section class="col-md-6 q-my-md col-xs-12 text-grey">
            <div class="col-sm-12 col-md-6">
              <div class="text-gray">Profit Price</div>
              <!-- <q-input class="col-8" v-model="sede.sede" :dense="dense" /> -->
              <q-input
                dense
                borderless
                v-model="infoQuick.profitPrice"
                filled
                input-class="text-left"
                placeholder=""
                class="q-mr-md"
              >
              </q-input>
            </div>
          </q-section>

          <q-section class="col-md-6 q-my-md col-xs-12 text-grey">
            <div class="col-sm-12 col-md-6">
              <div class="text-gray">Stock</div>
              <!-- <q-input class="col-8" v-model="sede.sede" :dense="dense" /> -->
              <q-input
                dense
                borderless
                filled
                v-model="infoQuick.stock"
                input-class="text-left"
                placeholder=""
                class="q-mr-md"
              >
              </q-input>
            </div>
          </q-section>
          <q-section class="col-md-6 q-my-md col-xs-12 text-grey">
            <div class="col-sm-12 col-md-6">
              <div class="text-gray">Availability Status</div>
              <!-- <q-input class="col-8" v-model="sede.sede" :dense="dense" /> -->
              <q-input
                dense
                borderless
                v-model="infoQuick.availability_status"
                filled
                input-class="text-left"
                placeholder=""
                class="q-mr-md"
              >
              </q-input>
            </div>
          </q-section>
        </q-card-section>
      </div>

      <q-card-actions class="col-12 row q-pa-md q-my-md" style="">
        <q-btn
          class="text-white col-md-5 col-xs-12 botones"
          type="submit"
          rounded
          @click="changeplan"
          :loading="loading"
          style="background-color: rgb(84, 105, 212)"
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
          "
        >
          Cancel
        </q-btn>
      </q-card-actions>
    </div>
  </q-section>
</template>

<script>
import { ref, defineAsyncComponent, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import useUI from "../../../composables/useUI";
//updatePlanEcwid
export default {
  props: {
    pMensaje: {},
    tuparametro: {},
  },
  emits: ["aceptar", "editar"],

  setup(props, context) {
    const modal = ref(true);
    console.log(props);
    const planSelected = ref(props.pMensaje.planName);
    const full_description = ref(props.pMensaje.full_description);
    const planPeriod = ref("");
    const loading = ref(false);
    const defaultName = ref(props.pMensaje.name);
    const defaultprice = ref(props.pMensaje.precio_profit);
    const router = useRouter();
    const disabledRadio = ref(false);
    const infoCategoriaGET = ref([]);
    const modificarCategoriaID = ref([]);
    const allCategoriaInfo = ref([]);
    const idPadrevar = ref(props.tuparametro.idPadre);
    const infoQuick = ref({
      name: props.pMensaje.name,
      full_description: props.pMensaje.full_description,
      defaultPrice: props.pMensaje.price,
      profitPrice: props.pMensaje.precio_profit,
      availability_status: props.pMensaje.availability_status,
      stock: "10",
    });
    const { updateCategoriaScrap, obtenerCategoriaID } = useUI();
    console.log(props.pMensaje, "precio_profit");
    console.log(props.pMensaje.name, "sdadsadsa");
    onMounted(async () => {
      console.log(idPadrevar.value, "idPadrevar");
    });

    return {
      obtenerCategoriaID,
      full_description,
      infoQuick,
      modificarCategoriaID,
      allCategoriaInfo,
      defaultName,
      defaultprice,
      modal,
      loading,
      infoCategoriaGET,
      planPeriod,
      planSelected,
      disabledRadio,
      idPadrevar,
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
  .contenedorcard {
    max-width: 800px;
  }
}
@media (max-width: 1440px) {
  .contenedorcard {
    max-width: 400px;
  }
}
@media screen and (min-width: 1240px) and (max-width: 1473px) {
}
@media screen and (min-width: 1024px) and (max-width: 1240px) {
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
}
</style>
