
export class Feedbacks {

    idsender:number;
    anonymous: boolean;
    date: Date;
    title: string;
    tags: string[];
    message: string;
    read: boolean;

    constructor(public id: number){
        this.anonymous= false;
        this.date= new Date();
        this.title= '';
        this.tags=[];
        this.message= '';
        this.read= false;
    }
}