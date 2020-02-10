
export class Createq {
    QCManswer: string[];
    qcm: boolean;
    constraints: boolean[];
    /**
     *première case des contraintes : obligatoire
     *deuxième case des contraintes : multi-choix
     */

    constructor(public question:string){
        this.qcm= false;
        this.QCManswer=[];
        this.constraints=[false,false];
    }
}