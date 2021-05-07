import {API_URL} from "../../constants";

/**
 * @typedef  {Object} PremiseData
 * @property {Number} Premise_ID
 * @property {Number} Member_ID
 * @property {Number} Route_ID
 */

export default class Premise{
    /**
     * 
     * @returns {Promise<PremiseData[]>}
     */
    static async getPremises(){
        const res = await fetch(`${API_URL}/premises`);
        if (res.status != 200) {
            console.error("Server returned with error");
            return false;
        }
        const data = await res.json();
        return data.data;

    }
}