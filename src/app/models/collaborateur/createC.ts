
export class CreateC {
    lastName: string;
    firstName: string;
    email: string;
    role: number;
    groups: string[];

    constructor(public id: number){
        this.id=null;
        this.firstName='';
        this.lastName='';
        this.role= 0;
        this.groups=[];
    }
    
}