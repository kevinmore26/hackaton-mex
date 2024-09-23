import axios from "axios";

const asistenciaApi = axios.create({
  baseURL: "https://datapayments.cloudmediapro.com/api/",
});
 
export default  asistenciaApi ;
