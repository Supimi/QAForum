import { OnChanges, OnInit } from '@angular/core';
import { User } from './User';

export class Student extends User implements OnInit, OnChanges {
    private index: string;

    constructor(attributes: any) {
        super(attributes);
        this.index = attributes.index;
    }

    ngOnInit() { }

    ngOnChanges() { }

    //setters for index number
    setIndex(value: any) {
        this.index = value;
    }

    //geter for get the value of the index number
    getIndexr(): any {
        return this.index;
    }



}