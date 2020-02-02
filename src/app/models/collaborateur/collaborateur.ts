import { CreateC } from './createC';

export class Collaborateur {
    _collaborateur: CreateC= {
        id: 0,
        firstName: 'Cap Projet',
        lastName: 'ESIEA',
        role: 0,
        groups: [
            'Fondateur',
            'Creator'
        ]
    }
    
    public getcollaborateur(): CreateC {
        return this._collaborateur;
    }
      public setfeedbacks(value: CreateC) {
        this._collaborateur = value;
     }
}