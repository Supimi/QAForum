import { OnChanges, OnInit } from '@angular/core';

export class Specialization implements OnInit, OnChanges {
    _id:string;
    module_code:string;
    module_name:string;
    semester:number;
    stream:string;

    constructor( module_code,module_name, semester,stream){
        this.module_code=module_code;
        this.module_name=module_name;
        this.semester=semester;
        this.stream=stream;
    }

    ngOnInit(){}
    ngOnChanges(){}

    get Id():string{
        return this._id;
    }
    get Module_code():string{
        return this.module_code;
    }

    get Module_name():string{
        return this.module_name;
    }

    get Semester():number{
        return this.semester;
    }

    get Stream():string{
        return this.stream;
    }


}