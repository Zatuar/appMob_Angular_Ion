
export class CreateF {
    title: string;
    to: string[];
    tags: string[];
    anonymous: boolean;
    message: string;
    date: Date;

    constructor(public id: number){
        this.title= '';
        this.to= [];
        this.tags= [];
        this.message= '';
        this.anonymous= false;
        this.date= new Date();
    }
}