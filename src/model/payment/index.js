export default class PaymentModel{
    static async paymentList(){
        return[
            {
                paymentId: 1,
                billId: 2,
                amountPaid: 100,
                totalAmount: 100,
                premisId: 12
            }
        ]
    }
}