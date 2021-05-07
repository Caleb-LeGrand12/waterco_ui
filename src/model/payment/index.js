import { API_URL } from '../../constants';

export default class PaymentModel{
    /**
        * 
        * @param {string} adminId 
        * @returns {Promise<any[]>}
        */
     static getAllPaiments(adminId) {
        const URL = `${API_URL}/payments/`;
        return fetch(URL)
            .then(res => res.json());
    }

    /**
     * 
     * @param {string} adminId 
     * @param {string} memberId 
     * @returns 
     */
    static async deletePayment(paymentId) {
        const URL = `${API_URL}/members/${paymentId}`
        return fetch(URL, {
            method: "DELETE",
        })
            .then(res => {
                if (res.status == 500) throw new Error("Failled to delete payment");
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
    static async addPayment(data) {
        const URL = `${API_URL}/payments/`
        return fetch(URL, {
            method: "POST",
            body: JSON.stringify(data)

        })
            .then(res => {
                if (res.status == 500) throw new Error("Failled to add bill");
                return res.json();

            });
    }

    static getAllBills(){
        const URL = `${API_URL}/bills/`;
        return fetch(URL)
            .then(res => res.json());
    }

    static getAllPremises(){
        const URL = `${API_URL}/premises/`;
        return fetch(URL)
            .then(res => res.json());
    }

}