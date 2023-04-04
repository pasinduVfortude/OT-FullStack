import { FileRepository } from "../repository/file";

export class FileService {
    private fileRepository : FileRepository;

    constructor() {
        this.fileRepository = new FileRepository;
    }

    async createData(filename: string, path: string): Promise<any>{ //create data
        console.log("Working")
        const data = await this.fileRepository.create(filename, path); //save data details
        return data;
    }

    // async editData(id: string, uid: string, Age: number): Promise<any> { //edit data
    //     const data = await this.fileRepository.edit(id, uid, Age); //save data details
    //     return data;
    // }

    // async FindData(uid: string) { //retrieve all
    //     const data = await this.fileRepository.find(uid);
    //     return data;
    // }

    // async FindSpecial(id: string, uid: string){ //retrieve special one
    //     const data = await this.fileRepository.findSpecial(id, uid);
    //     return data;
    // }

    async DeleteData(filename: string){ //delete special one
        const data = await this.fileRepository.delete(filename)
        return data;
    }
}