
export class CreateC {
    lastName: string;
    firstName: string;
    role: number;
    groups: string[];

    constructor(public id: number){
        this.id=null;
        this.firstName='';
        this.lastName='';
        this.role= null;
        this.groups=[];
    }
    
}