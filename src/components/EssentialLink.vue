<template>
  <div @click="handleLinkClick">
    <q-item clickable>
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import router from "src/router";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "#",
    },
    icon: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleLinkClick() {
      if (this.link.startsWith("http")) {
        window.open(this.link, "_blank");
      } else {
        // Simular la redirección interna
        console.log("Redireccionar a:", this.link);
        this.$router.push(this.link);
        // Aquí podrías usar this.$router.push(this.link) si link fuera una ruta interna
      }
    },
  },
});
</script>
