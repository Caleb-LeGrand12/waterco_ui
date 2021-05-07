import {API_URL} from "../../constants";

/**
 * @typedef  {Object} Bill
 * @property {Number} Premise_ID
 * @property {Number} Member_ID
 * @property {Number} Bill_id
 */
const TIMEOFFSSET = 1620419857867;

export default class BillModel {
    /**
        * 
        * @param {string} adminId 
        * @returns {Promise<any[]>}
        */
    static getAllMembers(adminId) {
        const URL = `${API_URL}/users/${adminId}/members/`
        return fetch(URL)
            .then(res => res.json());
    }

    /**
     * 
     * @param {string} adminId 
     * @param {string} memberId 
     * @returns 
     */
    static async deleteBill(billId) {
        const URL = `${API_URL}/members/${billId}`
        return fetch(URL, {
            method: "DELETE",
        })
            .then(res => {
                if (res.status == 500) throw new Error("Failled to delete member");
                return res.json();

            });
    }

    static async addBill(data) {
        const URL = `${API_URL}/bills`
        return fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...data, Bill_id: Date.now() - TIMEOFFSSET})

        })
            .then(res => {
                if (res.status == 500) throw new Error("Failled to add bill");
                return res.json();

            });
    }

    /**
         * 
         * @param {{
     *  First_name: string;
     *  Last_name: string;
     *  Member_email: string;
     *  Member_password
     * }} data
     */
    static async updateBill(data) {
        const URL = `${API_URL}/members`
        return fetch(URL, {
            method: "PUT",
            body: JSON.stringify(data)

        })
            .then(res => {
                if (res.status == 500) throw new Error("Failled to update bill");
                return res.json();

            });
    }

    /**
     * @returns {Promise<Bill[]>}
     */
    static async getListOfBills(){
        const res = await fetch(`${API_URL}/bills`);
        if (res.status != 200) {
            console.error("Server returned with error");
            return false;
        }
        const data = await res.json();
        return data.data;

    }

}