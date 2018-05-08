import { OnChanges, OnInit } from '@angular/core';
import { User } from './User';
//import {Specialization} from './specialization';

export class Academic_Staff_Member extends User implements OnInit, OnChanges {
    private position: string;
    private specialization: any;
    private non_aca_specilization: any;

    constructor(attributes:any) {
        super(attributes);
    }
    ngOnInit() { }

    ngOnChanges() { }

    //setters for the attributes
    setPosition(value:string){
        this.position=value;
    }

    setAca_specialization(value:any){
        this.specialization=value;
    }

    setNon_aca_specilization(value:any){
        this.specialization=value;
    }

    //getters for the attributes
    getAca_specialization(): any {
        return this.specialization;
    }

    getNon_aca_specilization(): any {
        return this.non_aca_specilization;
    }
    getPosition(): string {
        return this.position;
    }


}