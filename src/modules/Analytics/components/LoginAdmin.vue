<template>
  <q-card class="bg-white estilosCard">
    <div class="bg-white estilosCardChild">
      <div style="display: block; margin-top: 10px">
        <q-card-section
          class="row items-center q-px-sm q-py-none"
          style="margin-left: 17px"
        >
          <q-img
            :src="imagenLogo"
            style="
              max-width: 160px;
              margin: 0 auto;
              display: flex;
              justify-content: center;
            "
          />
        </q-card-section>
        <q-section v-show="!verificadorActivo">
          <div class="styleInput" style="margin-top: 50px">
            <q-input
              filled
              dense
              standout
              class="rounded-borders"
              input-class="rounded-borders"
              v-model="usuarioInfo.identifier"
              @update:model-value="toLowerUser()"
              hide-bottom-space
              placeholder="Username"
              ref="usernameRef"
              :rules="[
                (val) => (val && val.length > 0) || 'Completa este campo',
              ]"
              @keydown.enter.prevent="login"
              ><template v-slot:prepend>
                <q-icon name="person_outline" outlined /> </template
            ></q-input>
          </div>
          <div class="styleInput">
            <q-input
              filled
              dense
              @update:model-value="toLowerPass()"
              standout
              class="rounded-borders"
              input-class="rounded-borders"
              v-model="usuarioInfo.password"
              hide-bottom-space
              placeholder="password"
              ref="passwordRef"
              :rules="[
                (val) => (val && val.length > 0) || 'Completa este campo',
              ]"
              :type="isPwd ? 'password' : 'text'"
              @keydown.enter.prevent="login"
            >
              <template v-slot:prepend>
                <q-icon name="lock_outline" outlined /> </template
              ><template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                /> </template
            ></q-input>
          </div>
          <div class="styleInput">
            <q-select
              filled
              standout
              dense
              v-model="selectedOption"
              :options="options"
              hide-bottom-space
              ref="optionRef"
              @update:model-value="handleOptionChange()"
            >
              <template v-slot:prepend>
                <q-icon name="store" outlined />
              </template>
            </q-select>
          </div>
        </q-section>
        <div
          class="styleInput"
          style="margin-top: 50px"
          v-show="verificadorActivo"
        >
          <q-card-section class="col-12 q-px-sm q-py-none">
            <p
              class="q-ml-sm text-primary text-bold text-left texto-reset"
              style=""
            >
              Please enter your code.
            </p>
            <p
              class="q-ml-sm text-primary text-left"
              style="padding-top: 0px; margin-top: 0px"
            >
              Enter your verification code that we sent to your email, please
              don't reload the page.
            </p>
          </q-card-section>
          <q-input
            filled
            dense
            standout
            class="rounded-borders"
            input-class="rounded-borders"
            v-model="codigoModel"
            hide-bottom-space
            placeholder="Your Code"
            :rules="[(val) => (val && val.length > 0) || 'Completa este campo']"
            @keydown.enter.prevent="todoOk"
            ><template v-slot:prepend> <q-icon name="tag" outlined /> </template
          ></q-input>
        </div>
      </div>

      <q-card-actions
        align="right"
        class="q-pa-md q-py-none"
        v-show="!verificadorActivo"
      >
        <q-btn
          class="text-white col-12"
          :loading="loading"
          :disabled="mostrarError"
          @click="login"
          type="submit"
          style="
            background-color: #1e88e5;
            width: 100%;
            padding: 10px 0px;
            border-radius: 30px;
          "
        >
          Login
        </q-btn>
      </q-card-actions>

      <q-card-actions
        align="right"
        class="q-pa-md q-py-none"
        style=""
        v-show="verificadorActivo"
      >
        <q-btn
          class="text-white col-12"
          :loading="loading"
          @click="todoOk"
          type="submit"
          style="
            background-color: #1e88e5;
            width: 100%;
            padding: 10px 0px;
            border-radius: 30px;
          "
        >
          Verify
        </q-btn>
      </q-card-actions>

      <div class="styleInputError" v-show="errorMessage">
        <p>Correo o contraseña incorrectos.</p>
      </div>
      <div class="styleInputError">
        <p v-if="mostrarError">
          {{ mensajeError }}
        </p>
      </div>
    </div>
  </q-card>
</template>

<script>
import {
  ref,
  defineAsyncComponent,
  onMounted,
  watch,
  reactive,
  computed,
  watchEffect,
} from "vue";
import { useRouter } from "vue-router";
import imagenLogo from "../../../assets/logoazuloscuro.png";
import useUI from "../../../composables/useUI";
import "vue3-lottie";
import CryptoJS from "crypto-js";

import {
  setCssVar,
  Quasar,
  LocalStorage,
  SessionStorage,
  useQuasar,
} from "quasar";
export default {
  props: {
    pMensaje: {},
  },
  emits: ["aceptar"],
  setup(props) {
    const modal = ref(true);
    const intentosFallidos = ref(
      Number(localStorage.getItem("intentosFallidos") || 0)
    );
    const mostrarError = ref(false);
    const tiempoEspera = ref(Number(localStorage.getItem("tiempoEspera") || 0));
    const $q = useQuasar();
    const mensajeError = ref("");
    const verificadorActivo = ref(false);
    const tiempoRestante = ref(0);
    const usernameRef = ref(null);
    const passwordRef = ref(null);
    const router = useRouter();
    const selectedOption = ref(null);
    const loading = ref(false);
    const recordar = ref(false);
    const idEncryptStrapi = ref("");
    const infoPabbly = ref([]);
    const buscarCoincidencias = ref([]);
    const fechadd = ref("");
    const errorMessage = ref(false);
    const codigoModel = ref("");
    const tiendaseleccionada = ref([]);
    const domainListCopy = ref([]);
    const contador = ref(0);
    const usuarioInfo = ref({
      identifier: "",
      password: "",
    });
    const options = ref([]);
    const { usersScrap, tiendasOptions } = useUI();
    onMounted(async () => {
      localStorage.setItem("intentosFallidos", intentosFallidos.value);
      const resp = await tiendasOptions();
      for (let i = 0; i < resp.length; i++) {
        options.value.push(resp[i].attributes.nombreTienda);
      }

      const info = LocalStorage.getItem("infouser");
      console.log(info);
      if (info) {
        router.push("/catalog");
      } else {
        router.push("/login");
      }
    });
    watchEffect(() => {
      localStorage.setItem("intentosFallidos", intentosFallidos.value);
      localStorage.setItem("tiempoEspera", tiempoEspera.value);
    });
    return {
      modal,
      tiendasOptions,
      tiendaseleccionada,
      infoPabbly,
      options,
      mensajeError,
      tiempoEspera,
      fechadd,
      tiempoRestante,
      verificadorActivo,
      codigoModel,
      buscarCoincidencias,
      passwordRef,
      idEncryptStrapi,
      usernameRef,
      imagenLogo,
      selectedOption,
      intentosFallidos,
      mostrarError,
      recordar,
      router,
      loading,
      usuarioInfo,
      usersScrap,
      isPwd: ref(true),
      domainListCopy,
      errorMessage,
      contador,
      handleOptionChange: async () => {
        const resp = await tiendasOptions();
        for (let i = 0; i < resp.length; i++) {
          console.log("entrandoooO", selectedOption.value);
          if (selectedOption.value == resp[i].attributes.nombreTienda) {
            console.log("entrandoooO", tiendaseleccionada.value);
            tiendaseleccionada.value.push(resp[i].attributes);
          }
        }
      },

      todoOk: async () => {
        //"cloudmediapro"
        const resp = await usersScrap();
        if (codigoModel.value == resp.attributes.idEncyptParam) {
          loading.value = true;
            
          LocalStorage.set("infopanelusuario", resp);

          //--------------------------
          const infoUser2 = LocalStorage.getItem("infopanelusuario");
          //"cloudmediapro"
          buscarCoincidencias.value = [];
          //DESCOMENT KORE_2608
          for (let i = 0; i < resp2.length; i++) {
            if (resp2[i].attributes.correoUser == "jorge@cloudmediapro.com") {
              buscarCoincidencias.value.push(resp2[i]);
            }
          }
          let listCopia = {};
          for (
            let i = 0;
            i < buscarCoincidencias.value[0].attributes.domainList.length;
            i++
          ) {
            delete buscarCoincidencias.value[0].attributes.domainList[i].id;
            listCopia.value = {
              nameDomain: `${buscarCoincidencias.value[0].attributes.domainList[i].nameDomain}`,
              domainID: `${buscarCoincidencias.value[0].attributes.domainList[i].domainID}`,
            };
            domainListCopy.value.push(listCopia.value);
          }
          function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
          let randomNumber = getRandomInt(99999);

          router.push("/admin/stores");
          loading.value = false;
        } else {
          $q.notify({
            message: "Incorrect code.",
            color: "red",
          });
        }
      },
      toLowerUser() {
        usuarioInfo.value.identifier =
          usuarioInfo.value.identifier.toLowerCase();
        usuarioInfo.value.identifier = usuarioInfo.value.identifier.trim();
      },
      toLowerPass() {
        usuarioInfo.value.password = usuarioInfo.value.password.toLowerCase();
        usuarioInfo.value.password = usuarioInfo.value.password.trim();
      },

      probandoandoo: async () => {
        router.push("/login/verificador");
      },
      login: async () => {
        loading.value = true;

        usernameRef.value.validate();
        passwordRef.value.validate();
        if (usernameRef.value.hasError || passwordRef.value.hasError) {
          loading.value = false;
          return false;
        }
        //"cloudmediapro"
        const resp = await usersScrap();
        for (let i = 0; i < resp.length; i++) {
          if (
            usuarioInfo.value.identifier == resp[i].attributes.correoUser &&
            usuarioInfo.value.password == resp[i].attributes.passwordUser
          ) {
            buscarCoincidencias.value.push(resp[i]);
          } else {
            errorMessage.value = true;
          }
        }
        if (buscarCoincidencias.value.length > 0) {
          intentosFallidos.value = 0;
          tiempoRestante.value = 0;
          mensajeError.value = "";
          mostrarError.value = false;
          tiempoEspera.value = 0;
          contador.value = 0;
          if (
            usuarioInfo.value.identifier ==
              buscarCoincidencias.value[0].attributes.correoUser &&
            usuarioInfo.value.password ==
              buscarCoincidencias.value[0].attributes.passwordUser
          ) {
            console.log("hola");
            router.push("/catalog");
           
            LocalStorage.set("tiendaseleccionada", tiendaseleccionada.value[0]);
            LocalStorage.set("infouser", usuarioInfo.value.identifier);
          } else {
            intentosFallidos.value++;
            console.log("hola2");
            if (intentosFallidos.value >= 3) {
              // Si se exceden los intentos fallidos, mostrar el mensaje de espera
              tiempoEspera.value = Date.now() + 300000; // 300000ms = 5 minutos
              mostrarError.value = true;

              // Calcular el tiempo restante en segundos
              tiempoRestante.value = Math.round(
                (tiempoEspera.value - Date.now()) / 1000
              );

              // Actualizar el valor de tiempoRestante cada segundo
              const intervalId = setInterval(() => {
                tiempoRestante.value--;
              }, 1000);

              // Actualizar el mensaje de error cada vez que cambia el valor de tiempoRestante
              watchEffect(() => {
                if (tiempoRestante.value <= 0) {
                  clearInterval(intervalId);
                  mostrarError.value = false;
                  mensajeError.value = "";
                } else {
                  mensajeError.value = `Has excedido el número de intentos permitidos. Debes esperar ${tiempoRestante.value} segundos antes de volver a intentar.`;
                }
              });
            } else {
              errorMessage.value = true;
            }
          }
        } else {
          intentosFallidos.value++;

          if (intentosFallidos.value >= 3) {
            // Si se exceden los intentos fallidos, mostrar el mensaje de espera
            tiempoEspera.value = Date.now() + 300000; // 300000ms = 5 minutos
            mostrarError.value = true;

            // Calcular el tiempo restante en segundos
            tiempoRestante.value = Math.round(
              (tiempoEspera.value - Date.now()) / 1000
            );

            // Actualizar el valor de tiempoRestante cada segundo
            const intervalId = setInterval(() => {
              tiempoRestante.value--;
            }, 1000);

            // Actualizar el mensaje de error cada vez que cambia el valor de tiempoRestante
            watchEffect(() => {
              if (tiempoRestante.value <= 0) {
                clearInterval(intervalId);
                mostrarError.value = false;
                mensajeError.value = "";
              } else {
                mensajeError.value = `Has excedido el número de intentos permitidos. Debes esperar ${tiempoRestante.value} segundos antes de volver a intentar.`;
              }
            });
          } else {
            errorMessage.value = true;
          }
        }
        loading.value = false;
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 1270px) {
  .estilosCard {
    display: flex;
    width: 450px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 10px rgb(0 0 0 / 15%);
    border-radius: 10px;
    border: none;
    padding: 10px 20px;
  }
}
@media (max-width: 1270px) {
  .estilosCard {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 10px rgb(0 0 0 / 15%);
    border-radius: 10px;
    border: none;

    margin: 20px;
  }
}

.q-avatar {
  border-radius: 0% !important;
}
.q-px-sm {
  padding-left: 0% !important;
  padding-right: 0% !important;
}
.estilosCardChild {
  display: block;
  align-items: center;
  justify-content: center;
  margin: auto auto;
  background: white;
  padding: 20px;
  width: 360px;
}
@media (min-width: 1440px) {
}
@media screen and (min-width: 1240px) and (max-width: 1473px) {
}
@media screen and (min-width: 1024px) and (max-width: 1240px) {
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
}
.styleInput {
  border-radius: 20px !important;
  margin: 20px 10px;
}
.styleInputError {
  font-size: 13px;
  color: rgb(202, 40, 40);
  margin: 0px 15px;
}
.rounded-borders {
  border-radius: 10px;
}
</style>
