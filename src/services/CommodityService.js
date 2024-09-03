import axios from "axios";
import { PORT_No, BASE_URL } from "../services/ApiConstant";

const baseURL = `${BASE_URL}:${PORT_No}`;

export async function fetchCommodityData(uccId) {
  try {
    const response = await axios.get(`${baseURL}/CCPService/${uccId}`);
    console.log('API Response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.log("Error fetching Commodity position data:", error);
    throw error;
  }
}