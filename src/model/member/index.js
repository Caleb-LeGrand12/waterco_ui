import { API_URL } from "../../constants"
const TIMEOFFSSET = 1620419857867;

export default class MembersModel {
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
    static  deleteMember(memberId) {
        const URL = `${API_URL}/members/${memberId}`
        console.log(URL)
        return fetch(URL, {
            method: "DELETE",
        })
            .then(res => {
                if (res.status == 500) throw new Error("Failled to delete member");
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
    static  addMember(data) {
        console.log(data);
        const URL = `${API_URL}/members/`;
        data = {
            ...data,
            Member_ID: Date.now() - TIMEOFFSSET
        }
        return fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status == 500) throw new Error("Failled to add member");
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
    static async updateMember(data, memberId) {
        const URL = `${API_URL}/members/${memberId}`;
        return fetch(URL, {
            method: "PUT",
            body: JSON.stringify(data)
            
        })
            .then(res => {
                if (res.status == 500) throw new Error("Failled to update member");
                return res.json();

            });
    }

}