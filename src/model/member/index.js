export default class MembersModel {
    static async getAllMembers(){
        return [
            {
                memberId: 1,
                firstName: "John",
                lastName: "Doe",
                email: "jodoe@gmail.com"
            }
        ]
    }
}