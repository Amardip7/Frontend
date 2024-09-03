import axios from "axios";
import { PORT_No, BASE_URL } from "../services/ApiConstant";

const baseURL = `${BASE_URL}:${PORT_No}`;

export async function fetchFOData(uccId) {
  try {
    const response = await axios.get(`${baseURL}/getFNOPosition/${uccId}`);
    console.log('API Response:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.log("Error fetching FNO position data:", error);
    throw error;
  }
}


// //Outgoing
// export async function postFNOData(data) {
//   try {
//     const response = await fetch(`${baseURL}/squareoff/order/${uccId}/${prodTyp}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error posting FNO data:', error);
//     throw error; // Re-throw the error to be handled by the caller
//   }
// }


export async function postFNOData(data, uccId, prodTyp) {
  try {
    const response = await fetch(`http://localhost:8081/squareoff/order/${uccId}/${prodTyp}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response)

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error posting FNO data:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
// export const postFNOData = async (data,FFO_USR_ID, FFO_PRDCT_TYP) => {
//   try {
//     const response = await fetch(`http://localhost:8080/squareoff/order/${FFO_USR_ID}/${FFO_PRDCT_TYP}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
    
//     if (!response.ok) {
//       throw new Error(`Network response was not ok: ${response.statusText}`);
//     }
    
//     return response.json();
//   } catch (error) {
//     console.error('Error posting FNO data:', error);
//     throw error;
//   }
// };
