<template>
  <div class="layout-container">
    <!-- Mapa en la parte superior -->
    <div class="map-container">
      <l-map ref="map" v-model:zoom="zoom" :center="[23.6345, -102.5528]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-geo-json :geojson="mexicoZone" @click="onZoneClick"></l-geo-json>
      </l-map>
    </div>

    <!-- Panel flotante de información en la parte inferior derecha -->
    <div v-if="selectedState" class="info-panel">
      <h3>{{ selectedState.name || 'Estado no disponible' }}</h3>
      <p><strong>Recomendación:</strong> {{ selectedState.recommendation || 'Sin datos' }}</p>
      <p><strong>Índice de contaminación:</strong> {{ selectedState.pollution_index || 'Sin datos' }}</p>
      <p><strong>Calidad del aire:</strong> {{ selectedState.air_quality || 'Sin datos' }}</p>
      <p><strong>Riesgo de cáncer:</strong> {{ selectedState.cancer_risk || 'Sin datos' }}</p>
      <p><strong>Consejos de salud:</strong></p>
      <ul class="health-list">
        <li v-for="(item, index) in selectedState.health_recommendations" :key="index">
          {{ item || 'Sin recomendaciones' }}
        </li>
      </ul>
      <!-- Botón para activar la lectura en voz alta -->
      <button @click="leerTexto" class="btn-primary">Escuchar Información</button>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { ref } from "vue";
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";
import estados from "./estados_modificado2.json";

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  setup() {
    const zoom = ref(5);
    const mexicoZone = ref(estados);
    const selectedState = ref(null);

    const onZoneClick = (e) => {
      const properties = e.layer.feature.properties;
      selectedState.value = properties;
    };

    const leerTexto = () => {
      const state = selectedState.value;

      if (!state) {
        alert('No hay un estado seleccionado para leer.');
        return;
      }

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }

      const name = state.name || 'Estado no disponible';
      const recommendation = state.recommendation || 'Sin recomendaciones';
      const pollutionIndex = state.pollution_index || 'Sin datos';
      const airQuality = state.air_quality || 'Sin datos';
      const cancerRisk = state.cancer_risk || 'Sin datos';
      const healthRecommendations = Array.isArray(state.health_recommendations)
        ? state.health_recommendations.join(", ")
        : "Sin recomendaciones de salud disponibles";

      const text = `
        Estado: ${name}. 
        Recomendación: ${recommendation}.
        Índice de contaminación: ${pollutionIndex}.
        Calidad del aire: ${airQuality}.
        Riesgo de cáncer: ${cancerRisk}.
        Consejos de salud: ${healthRecommendations}.
      `;

      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'es-ES';
      window.speechSynthesis.speak(speech);
    };

    return {
      zoom,
      mexicoZone,
      onZoneClick,
      selectedState,
      leerTexto
    };
  },
};
</script>

<style>
/* Contenedor principal */
.layout-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

/* Mapa en la parte superior */
.map-container {
  height: 70vh;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Panel flotante */
.info-panel {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  font-family: 'Helvetica Neue', sans-serif;
  z-index: 1000;
}

/* Título del panel */
.info-panel h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #34495e;
}

/* Texto del panel */
.info-panel p {
  font-size: 16px;
  margin: 5px 0;
  color: #2c3e50;
}

/* Lista de recomendaciones */
.health-list {
  padding-left: 20px;
  list-style-type: disc;
  margin-top: 10px;
}

.health-list li {
  font-size: 14px;
  margin: 5px 0;
  color: #2c3e50;
}

/* Botón personalizado */
.btn-primary {
  background-color: #2980b9;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-primary:hover {
  background-color: #3498db;
}
</style>
