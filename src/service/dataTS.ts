import { DataRepository } from "../repository/dataTS";

export class DataService {
    private dataRepository : DataRepository;

    constructor() {
        this.dataRepository = new DataRepository;
    }

    async createData(team: string, date: string, employees:string): Promise<any>{ //create data
        console.log("Working")
        console.log(employees)
        console.log(team)
        console.log(date)
        console.log("Working")
        const data = await this.dataRepository.create(team, date, employees); //save data details
        return data;
    }

    async HODApprove(date: string): Promise<any> { //edit data
        const data = await this.dataRepository.HODApprove(date); //save data details
        return data;
    }

    async GMApprove(date: string): Promise<any> { //edit data
        const data = await this.dataRepository.GMApprove(date); //save data details
        return data;
    }

    async FindData(date: string) { //retrieve all
        const data = await this.dataRepository.find(date);
        // console.log("Data: "+data)
        return data;
    }

    // async FindSpecial(id: string, uid: string){ //retrieve special one
    //     const data = await this.dataRepository.findSpecial(id, uid);
    //     return data;
    // }

    // async DeleteData(id: string){ //delete special one
    //     const data = await this.dataRepository.delete(id)
    //     return data;
    // }
}