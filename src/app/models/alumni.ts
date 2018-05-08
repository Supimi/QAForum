import { OnChanges, OnInit } from '@angular/core';
import { User } from './User';

export class Alumni extends User implements OnInit, OnChanges {
    private position: string;
    private working_place: string;
    constructor(attributes:any) {
        super(attributes);
        this.position=attributes.position;
        this.working_place=attributes.working_place;
    }
    
    ngOnInit() { }

    ngOnChanges() { }

    //setters for the attributes
    setPosition(value:string){
        this.position=value;
    }

    setWorkingPlace(value:string){
        this.working_place=value;
    }

    //getters for the attributes
    getPosition(): string {
        return this.position;
    }

    getWorkingPlace(): string {
        return this.working_place;
    }



}