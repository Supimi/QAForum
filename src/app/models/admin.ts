import { OnChanges, OnInit } from '@angular/core';
import { User } from './User';

//singolton admin
export class Admin extends User implements OnInit, OnChanges {

    public static adminInstance: Admin;
    private position: string;

    private constructor(attrbutes:any) {
        super(attrbutes);
    }

    ngOnInit() { }

    ngOnChanges() { }

    setPosition(value: any) {
        this.position = value;
    }

    getPosition(): any {
        return this.position;
    }

    private static getAdmin(){
        return this.adminInstance;
    }

    static createAdminInstance(attrbutes:any){
        this.adminInstance=new Admin(attrbutes);
        return this.adminInstance;
    }







}