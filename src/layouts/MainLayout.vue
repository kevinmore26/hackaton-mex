<template>
  <div tyle="min-height: 100vh !important" class="fondocolor">
    <q-layout view="lHr lpr lFr">
      <!-- <img :src="fondoPanel" class="imagenfondo" /> -->
 
      <!-- <q-drawer v-model="leftDrawerOpen" bordered>
        <q-section style="margin: 40px" class="q-py-md q-py-xs">
          <q-img :src="logo" class="imagenlogo"></q-img>
        </q-section>
        <q-list>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-drawer> -->

      <q-page-container>
        <!-- <router-view />   -->
        <router-view v-slot="{ Component }">
          <keep-alive :include="tabActivo">
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
        <q-inner-loading
          :showing="loading2"
          label-class="text-teal"
          label-style="font-size: 1.1em"
        >
          <q-spinner color="primary" size="4em"></q-spinner>
        </q-inner-loading>
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <!-- <router-view v-slot="{ Component }">         
        <template v-if="tabs.findIndex(i => i.ruta.router == $route.name)>-1">
          <keep-alive>
            <component :is="Component" :key="$route.fullPath"></component>
          </keep-alive>
        </template>  
        <template v-else>         
            <component :is="Component" :key="$route.fullPath"></component>          
        </template>  
      </router-view>  -->
 
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import {
  ref,
  defineComponent,
  defineAsyncComponent,
  onMounted,
  onBeforeUnmount,
  watch,
} from "vue";
import {
  setCssVar,
  Quasar,
  LocalStorage,
  SessionStorage,
  useQuasar,
} from "quasar";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";
import logo from "../assets/logoazuloscuro.png";
import fondoPanel from "../assets/amazon2.jpg"; 
import useUI from "../composables/useUI";
const linksList = [
  {
    title: "Búsqueda orgánica",
    icon: "homepage",
    link: "/homepageamazon",
  },
  {
    title: "Productos de la tienda",
    icon: "sync",
    link: "/sync",
  },
  {
    title: "Catálogo de productos",
    icon: "code",
    link: "/catalog",
  },

  {
    title: "Settings",
    icon: "settings",
    link: "/settings",
  },
  {
    title: "Logout",
    icon: "logout",
    link: "/login",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },
  methods: {
    handleLinkClick(link) {
      // Si el enlace es externo, abrir en una nueva pestaña
      if (link.link.startsWith("http")) {
        window.open(link.link, "_blank");
      } else {
        // Si es una ruta interna, usar router.push
        this.$router.push(link.route);
      }
    },
  },
  setup() {
    const { usersScrap, tiendasOptions } = useUI();
    const leftDrawerOpen = ref(false);
    const drawer2 = ref(false);
    const tab = ref("home");
    const router = useRouter();
    const miniState = ref(false);
    const options = ref([]);
    const isFocused = ref(false);
    const tiendalogin = ref("");
    const selectedIndex = ref("");
    onMounted(async () => {
      //DESCOMENT
      const storedIndex = localStorage.getItem("selectedIndex");
      if (storedIndex !== null) {
        const parsedIndex = parseInt(storedIndex, 10);
        if (!isNaN(parsedIndex)) {
          console.log(parsedIndex);
          // Verificar si es un número válido
          selectedIndex.value = parsedIndex;
        }
      }
      const resp = await tiendasOptions();
      for (let i = 0; i < resp.length; i++) {
        options.value.push(resp[i].attributes);
      }
      console.log(options.value);
      const tienda = LocalStorage.getItem("tiendaseleccionada");
      console.log(tienda);
      tiendalogin.value = tienda.nombreTienda;
      //router.push("/login");
    });
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      tiendalogin,
      isFocused,
      options, 
      selectedIndex,
      drawer: ref(false),
      miniState,
      router,
      drawer2,
      usersScrap,
      tiendasOptions,
      tab,
      logo,
      fondoPanel,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      sitesLink(index) {
        localStorage.setItem("selectedIndex", index.toString());
        selectedIndex.value = index;
        router.push("/sync");
      },
      changepass() {
        router.push("/login/verificador");
      },
      mysitex: async (index) => {
        localStorage.setItem("selectedIndex", index.toString());
        selectedIndex.value = index;
        tab.value = "auto_fix_normal";
        router.push("/sync");
      },
      homepage(index) {
        isFocused.value = true;
        selectedIndex.value = index;
        localStorage.setItem("selectedIndex", index.toString());
        tab.value = "homepage";
        router.push("/homepage");
      },
      homeLink(index) {
        console.log("homeLink");
        selectedIndex.value = index;
        localStorage.setItem("selectedIndex", index.toString());
        tab.value = "catalog";
        router.push("/catalog");
      },
      upgradeplan(index) {
        console.log("upgradeplan");
        this.isActive = true;
        localStorage.setItem("selectedIndex", index.toString());
        selectedIndex.value = index;
        tab.value = "upgrade";
        router.push("/panelcloudmedia/upgradeplan");
      },
      logout(index) {
        console.log("entrandooooo");
        selectedIndex.value = index;
        tab.value = "logout";
        SessionStorage.remove("infouser");
        LocalStorage.remove("infouser");
        LocalStorage.remove("tiendaseleccionada");
        LocalStorage.remove("infopanelusuario");
        LocalStorage.remove("miprofit");
        router.push("/login");
      },
      settingsLink(index) {
        selectedIndex.value = index;
        localStorage.setItem("selectedIndex", index.toString());
        tab.value = "credit_card";
        router.push("/settings");
      },
      drawerClick(e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false;

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation();
        }
      },
      onOptionClick: async (info) => {
        console.log(info);
        localStorage.setItem("miprofit", info.profitPrice.toString());
        LocalStorage.set("tiendaseleccionada", info);
        window.location.reload(true);
      },
    };
  },
});
</script>
<style>
.fondocolor {
  background-color: rgb(182, 209, 233);
  width: 100%;
}
.imagenlogo {
  margin: 0 auto;
  max-width: 100px;
  display: flex;
  justify-content: center;
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

/*  */

.imangenmobilelogo {
  transition: left 0.5s ease-in-out !important;
}
.list-item-selected-icon {
  color: white !important;
}
.list-item-selected:focus {
  transition: all 0.5s !important;
  color: white !important;
  border-radius: 20px;
  background-color: #1e88e5 !important ;
}
.list-item-selected {
  background-color: #1e88e5 !important ;
  transition: all 0.5s !important;
  color: white !important;
  border-radius: 20px;
}

.q-drawer--left {
  transition: left 0.5s ease-in-out !important;
}
.otroooo2 {
  transition: right 0.5s ease-in-out !important;
}
@media (min-width: 750px) {
  .otrooo {
    display: none;
  }
}
.btndrop {
  transition: right 0.5s ease-in-out !important;
}
@media (min-width: 3300px) {
  .q-drawer--left {
    left: 1000px !important;
    margin: 40px 0 !important;
    border-radius: 10px !important;
    padding: 20px !important;
    box-shadow: 3px 4px 14px 4px #00000026 !important;
  }
  .drawerleft {
    left: 1000px !important;
    margin: 40px 0 !important;
    border-radius: 10px !important;
    padding: 20px !important;
    box-shadow: 3px 4px 14px 4px #00000026 !important;
  }
  .btndrop {
    position: absolute;
    right: 1000px !important;
    z-index: 9000;
    margin: 15px;
    border: none !important;
    background: transparent;
    font-size: 30px;
  }
}
@media screen and (min-width: 1900px) and (max-width: 3300px) {
  .q-drawer--left {
    left: 400px !important;
    margin: 40px 0 !important;
    border-radius: 10px !important;
    padding: 20px !important;
    box-shadow: 3px 4px 14px 4px #00000026 !important;
  }

  .drawerleft {
    left: 400px !important;
    margin: 40px 0 !important;
    border-radius: 10px !important;
    padding: 20px !important;
    box-shadow: 3px 4px 14px 4px #00000026 !important;
  }
  .btndrop {
    position: absolute;
    right: 400px !important;
    z-index: 9000;
    margin: 15px;
    border: none !important;
    background: transparent;
    font-size: 30px;
  }
}
@media screen and (min-width: 700px) and (max-width: 2000px) {
  .drawerleft {
    left: 100px !important;
    margin: 40px 0 !important;
    border-radius: 10px !important;
    padding: 20px !important;
    box-shadow: 3px 4px 14px 4px #00000026 !important;
  }
  .q-drawer--left {
    left: 100px !important;
    margin: 40px 0 !important;
    border-radius: 10px !important;
    padding: 20px !important;
    box-shadow: 3px 4px 14px 4px #00000026 !important;
    max-height: 800px;
  }
  .btndrop {
    position: absolute;
    right: 0;
    z-index: 9000;
    margin: 15px;
    border: none !important;
    background: transparent;
    font-size: 30px;
  }
}
.probandooo {
  background-color: #1e88e5 !;
  color: white !important;
  border-radius: 50%;
  padding: 0px;
  transition: 0.3s;
}

.q-hoverable:hover > .q-focus-helper {
  border-radius: 20px !important;
}
.tblData .q-item:hover {
  color: black;
  border-radius: 20px;
}
</style>
