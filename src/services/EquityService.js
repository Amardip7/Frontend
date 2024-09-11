import axios from "axios";
import { PORT_No, BASE_URL } from "../services/ApiConstant";

const baseURL = `${BASE_URL}:${PORT_No}`;

export async function fetchEquityData(uccId) {
  try {
    const response = await axios.get(`${baseURL}/PositionService/${uccId}`);
    console.log('API Response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.log("Error fetching Equity position data:", error);
    throw error;
  }
}