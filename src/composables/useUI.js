import { useStore } from "vuex";
import { computed } from "vue";
import axios from "axios";
import asistenciaAPI from "../api/asistenciaAPI";
import {
  setCssVar,
  Quasar,
  LocalStorage,
  SessionStorage,
  useQuasar,
} from "quasar";

const useUI = () => {
  const store = useStore();
  //https://api.cloudmediapro.com/api/appecwid

  const postProductsShop = async (info, tiendaID, bearerToken) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      };
      const { data } = await asistenciaAPI.post(
        `https://api.cloudmediapro.com/api/appecwid/api/v3/${tiendaID}/products`,
        info,
        {
          headers,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  //combinaciones
  const postCombinationsProductsShop = async (
    info,
    tiendaID,
    productID,
    bearerToken
  ) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      };
      const { data } = await asistenciaAPI.post(
        `https://api.cloudmediapro.com/api/appecwid/api/v3/${tiendaID}/products/${productID}/combinations`,
        info,
        {
          headers,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const postImageCombinationsProductShop = async (
    info,
    tiendaID,
    productID,
    variationId,
    bearerToken,
    externalUrl
  ) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      };
      const { data } = await asistenciaAPI.post(
        `https://api.cloudmediapro.com/api/appecwid/api/v3/${tiendaID}/products/${productID}/combinations/${variationId}/image?fileName=probandokevin.psd&description=probandokevin&externalUrl=${externalUrl}`,
        info,
        {
          headers,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  //combinaciones
  //tipo de imagen es o la principal o las secundarias
  //image or gallery
  const postImagePrincipalandSecundariaProductShop = async (
    info,
    tiendaID,
    bearerToken,
    productID,
    tipodeimagen,
    fileName,
    description,
    externalUrl
  ) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      };
      const { data } = await asistenciaAPI.post(
        `https://api.cloudmediapro.com/api/appecwid/api/v3/${tiendaID}/products/${productID}/${tipodeimagen}?fileName=${fileName}&description=${description}&externalUrl=${externalUrl}`,
        info,
        {
          headers,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const postCategory = async (info, tiendaID, bearerToken) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      };
      const { data } = await asistenciaAPI.post(
        `https://api.cloudmediapro.com/api/appecwid/api/v3/${tiendaID}/categories`,
        info,
        {
          headers,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getCategories = async (
    tiendaID,
    bearerToken,
    offset = 0,
    allCategories = []
  ) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      };

      const { data } = await asistenciaAPI.get(
        `https://api.cloudmediapro.com/api/appecwid/api/v3/${tiendaID}/categories?offset=${offset}`,
        {
          headers,
        }
      );

      // Concatenar las categorías obtenidas al arreglo existente
      allCategories = allCategories.concat(data.items);

      const { total, count, limit } = data;

      // Verificar si hay más categorías para obtener
      if (offset + limit < total) {
        const nextOffset = offset + limit;
        // Llamada recursiva para obtener el siguiente lote de categorías
        return getCategories(tiendaID, bearerToken, nextOffset, allCategories);
      }

      return allCategories; // Devolver todas las categorías recolectadas
    } catch (error) {
      console.log(error);
      return []; // Manejo del error, retornar un arreglo vacío en caso de error
    }
  };
  const getProducts = async (
    tiendaID,
    bearerToken,
    offset = 0,
    allProducts = []
  ) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      };

      const { data } = await asistenciaAPI.get(
        `https://api.cloudmediapro.com/api/appecwid/api/v3/${tiendaID}/products?offset=${offset}`,
        {
          headers,
        }
      );

      // Concatenar las categorías obtenidas al arreglo existente
      allProducts = allProducts.concat(data.items);

      const { total, count, limit } = data;

      // Verificar si hay más categorías para obtener
      if (offset + limit < total) {
        const nextOffset = offset + limit;
        // Llamada recursiva para obtener el siguiente lote de categorías
        return getProducts(tiendaID, bearerToken, nextOffset, allProducts);
      }

      return allProducts; // Devolver todas las categorías recolectadas
    } catch (error) {
      console.log(error);
      return []; // Manejo del error, retornar un arreglo vacío en caso de error
    }
  };
  const usersScrap = async () => {
    try {
      const { data } = await axios.get(
        `https://datapayments.cloudmediapro.com/api/scrap-google-logins`
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getpruebarticlespython = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000",
      );
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const scrapArticles = async (info) => {
    try {
      const { data } = await asistenciaAPI.post(
        "http://localhost:8000/api/scrape",
        info,
      );
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const listaStoresEcwid = async (info) => {
    try {
      const { data } = await asistenciaAPI.get(
        `https://api.cloudmediapro.com/api/appecwid/resellerapi/v1/stores?key=OunTpHSfEKXG1iE&order=email_desc&limit=100`,
        info
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const tiendasOptions = async () => {
    try {
      const { data } = await asistenciaAPI.get(
        `https://datapayments.cloudmediapro.com/api/scrap-google-sites`
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const agregarCagegoriaScrap = async (info) => {
    try {
      const { data } = await asistenciaAPI.post(
        `scrap-google-articles?populate=*`,
        info
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const updateCategoriaScrap = async (id, info) => {
    try {
      const { data } = await asistenciaAPI.put(
        `scrap-google-articles/${id}?populate=*`,
        info
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCategoriaID = async (id, info) => {
    try {
      const { data } = await asistenciaAPI.get(
        `scrap-google-articles/${id}?populate=*`,
        info
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const actualizarCategoriaID = async (id, info) => {
    try {
      const { data } = await asistenciaAPI.put(
        `scrap-google-articles/${id}?populate=*`,
        info
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const obtenerCategoriaStrapi = async (info, start = 0, limit = 100) => {
    try {
      const { data } = await asistenciaAPI.get(
        `scrap-google-articles?populate=*&pagination[start]=${start}&pagination[limit]=${limit}`,
        info
      );

      const responseData = data.data;

      if (responseData.length === 0) {
        // Si no hay más datos, retornamos un arreglo vacío para finalizar la recursión
        return [];
      }

      // Continuamos la recursión con la siguiente página
      const nextPageStart = start + limit;
      const nextPageData = await obtenerCategoriaStrapi(
        info,
        nextPageStart,
        limit
      );

      // Combinamos los datos de la página actual con los de la siguiente página
      return responseData.concat(nextPageData);
    } catch (error) {
      console.log(error);
      // En caso de error, puedes manejarlo aquí según tus necesidades
      return [];
    }
  };

  const searchamazonscraping = async (busqueda, page, info) => {
    try {
      const { data } = await asistenciaAPI.get(
        `https://api.cloudmediapro.com/api/scraperapi/structured/amazon/search?api_key=0a355936a58a867eb268f68ef82555a3&premium=true&query=${busqueda}&autoparse=true&country_code=us&page=${page}`,
        info
      );
      return data;
    } catch (error) {
      if (error.response) {
        error.details = {
          general: error.response,
          status: error.response.status,
          data: error.response.data,
        };
      }
      throw error;
    }
  };

  const searchserapi = async (busqueda, page, info) => {
    try {
      const { data } = await asistenciaAPI.get(
        `http://localhost:8000/api/serpapi`, // URL de tu endpoint FastAPI
        {
          params: {
            query: busqueda, // Pasar 'busqueda' como parámetro de consulta
            // page: page // Si necesitas pasar 'page' como parámetro de consulta, asegúrate de que tu endpoint en FastAPI lo maneje
          },
          ...info // Mantener otros parámetros y configuraciones si son necesarios
        }
      );
      return data;
    } catch (error) {
      if (error.response) {
        error.details = {
          general: error.response,
          status: error.response.status,
          data: error.response.data,
        };
      }
      throw error;
    }
  };
  
  const searchURLscraping = async (urlinfo, info) => {
    try {
      const { data } = await asistenciaAPI.get(
        `https://api.cloudmediapro.com/api/scraperapi/?api_key=0a355936a58a867eb268f68ef82555a3&premium=true&url=${urlinfo}&autoparse=True&country_code=us`,
        info
      );
      return data;
    } catch (error) {
      if (error.response) {
        error.details = {
          general: error.response,
          status: error.response.status,
          data: error.response.data,
        };
      }
      throw error;
    }
  };

  const searchproductamazonscraping = async (asin, info) => {
    try {
      const { data } = await asistenciaAPI.get(
        `https://api.cloudmediapro.com/api/scraperapi/structured/amazon/product?api_key=0a355936a58a867eb268f68ef82555a3&premium=true&country_code=us&autoparse=true&asin=${asin}`,
        info
      );
      return data;
    } catch (error) {
      if (error.response) {
        error.details = {
          general: error.response,
          status: error.response.status,
          data: error.response.data,
        };
      }
      throw error;
    }
  };
  const partnerLogin = async (ownerid, timestamp, token, profileId, info) => {
    try {
      const { data } = await asistenciaAPI.get(
        `https://my.cloudmediapro.com/cp/partner-login?ownerid=${ownerid}&t=${timestamp}&login_sha1token=${token}&inline&profile_id=${profileId}`,
        info
      );
      return data;
    } catch (error) {}
  };
  const searchPriceProductAmazon = async (url, info) => {
    try {
      const { data } = await asistenciaAPI.get(
        `${url}&api_key=0a355936a58a867eb268f68ef82555a3`,
        info
      );
      return data;
    } catch (error) {
      if (error.response) {
        error.details = {
          general: error.response,
          status: error.response.status,
          data: error.response.data,
        };
      }
      throw error;
    }
  };
  return {
    partnerLogin,
    postCategory,
    scrapArticles,
    actualizarCategoriaID,
    postProductsShop,
    postCombinationsProductsShop,
    postImageCombinationsProductShop,
    getpruebarticlespython,
    searchserapi,
    tiendasOptions,
    store,
    listaStoresEcwid,
    usersScrap,
    searchPriceProductAmazon,
    getProducts,
    postImagePrincipalandSecundariaProductShop,
    searchamazonscraping,
    getCategories,
    searchproductamazonscraping,
    searchURLscraping,
    obtenerCategoriaStrapi,
    agregarCagegoriaScrap,
    updateCategoriaScrap,
    obtenerCategoriaID,
  };
};
export default useUI;
