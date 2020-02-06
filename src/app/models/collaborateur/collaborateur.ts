import { CreateC } from './createC';

export class Collaborateur {
    _collaborateur: CreateC= {
        id: 0,
        firstName: 'Cap Projet',
        lastName: 'ESIEA',
        email: 'test@esiea.fr',
        role: 4,
        groups: [
            'Fondateur',
            'Creator'
        ]
    }
    /**
     * 0: user
     * 1: 
     * 2: Creator
     * 3: Master
     * 4: Administrator
     */
    
    public getcollaborateur(): CreateC {
        return this._collaborateur;
    }
      public setfeedbacks(value: CreateC) {
        this._collaborateur = value;
     }
}