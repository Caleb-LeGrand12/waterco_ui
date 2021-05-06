export default class BillModel{
    static async getListOfBills(){
        return [
            {
                billId: 1,
                premiseId: 43,
                memberId: 21
            }
        ]
    }
}