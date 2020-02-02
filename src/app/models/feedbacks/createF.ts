
export class CreateF {
    fname: string;
    to: string;
    tags: string[];
    message: string;
    anonymous: boolean;
    read: boolean;

    constructor(public id: number){
        this.fname= '';
        this.to= '';
        this.tags= [];
        this.message= '';
        this.anonymous= false;
        this.read= false;
    }
}