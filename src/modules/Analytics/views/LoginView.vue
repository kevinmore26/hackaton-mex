<template>
  <div class="bg-image">
    <img :src="fondoPanel" class="imagenfondo" />
    <div
      style="
        background: white;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <LoginAdmin />
      <q-section class="footer row">
        <div class="footer2">
          <div
            class="row"
            style="
              display: flex;
              justify-content: space-between;
              max-width: 1200px;
              margin: 0 auto;
              position: relative;
              top: 8px;
            "
          >
            <q-section class="text-white">
              <p
                style="
                  font-size: 14px;
                  font-family: Montserrat;
                  margin: 0.4em 0;
                  font-weight: 400;
                "
              >
                Made with
                <span
                  ><img
                    data-preserve-html-node="true"
                    src="https://cloudmediapro.com/wp-content/uploads/2023/07/heart.svg"
                    alt="love"
                    style="width: 15px; height: 15px; display: inherit"
                /></span>

                <span
                  class="txt-rotate"
                  data-period="500"
                  data-rotate='[ "Estados Unidos.", "Argentina.", "Colombia.", "Venezuela.", "Perú" ]'
                  ><span class="wrap">By Cloud Media Pro </span></span
                >
              </p>
            </q-section>
            <q-section>
              <a
                href="https://api.whatsapp.com/send/?phone=%2B19547690084&text&type=phone_number&app_absent=0"
                target="blank"
              >
                <q-img :src="wssp" class="imgFooter" />
              </a>
              <a href="https://www.instagram.com/cloudmediapro/" target="blank">
                <q-img :src="insta" class="imgFooter" />
              </a>
              <a
                href="https://www.facebook.com/cloudmediaprowebsolutions/"
                target="blank"
              >
                <q-img :src="face" class="imgFooter" />
              </a>
            </q-section>
          </div>
        </div>
      </q-section>
    </div>
  </div>
</template>
<script>
import { defineAsyncComponent, onMounted } from "vue";
import fondoPanel from "../../../assets/otraimagen.jpeg";
export default {
  components: {
    LoginAdmin: defineAsyncComponent(() =>
      import("../components/LoginAdmin.vue")
    ),
  },
  setup() {
    return {
      fondoPanel,
      backgroundDiv: {
        backgroundImage:
          "https://cloudmediapro.com/wp-content/uploads/2021/05/contacto.svg !important",
        backgroundRepeat: "no-repeat !important",
        backgroundSize: "100% 100% !important",
      },
    };
  },
};
</script>
<style>
.footer {
  position: fixed; /* Cambiar de relative a fixed */
  bottom: 0; /* Asegurarse de que el footer esté alineado en la parte inferior */
  left: 0; /* Alinear el footer a la izquierda */
  right: 0; /* Alinear el footer a la derecha */
  background-color: #272727;
  height: 50px;
  width: 100vw !important;
  justify-content: center;
  display: flex;
  color: white;
}
@media (min-width: 1270px) {
  .imagenfondo {
    background-size: 100vw 100vh !important ;
    width: 100vw;
    max-height: 100vh;
    background-repeat: no-repeat !important;
    right: 0px;
    position: absolute;
    object-fit: cover;
  }
}
@media (max-width: 1270px) {
  .imagenfondo {
    background-size: 100vw 100vh !important ;
    max-height: 100vh;
    background-repeat: no-repeat !important;
    right: 0px;
    position: absolute;
    transform: rotate(180deg);
    width: 100vw !important;
    height: 100vh !important;
  }
}
</style>
