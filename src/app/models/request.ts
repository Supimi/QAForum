import { OnChanges, OnInit } from '@angular/core';

export class Request implements OnInit, OnChanges {
    _id:string;
    firstname:string;
    lastname:string;
    username:string;
    usertype:string;
    email:string;
    position:string;
    status:boolean;
    viewstatus:boolean;
    date:any;

    constructor(attributes:any){
        this._id=attributes._id;
        this.firstname=attributes.firstname;
        this.lastname=attributes.lastname;
        this.username=attributes.username;
        this.usertype=attributes.usertype;
        this.email=attributes.email;
        this.position=attributes.position;
        this.status=attributes.status;
        this.viewstatus=attributes.viewstatus;
        this.date=attributes.date;
    }

    ngOnInit(){}
    ngOnChanges(){
        
    }

    getId(){
        return this._id;
    }

    getFirstName(){
        return this.firstname;
    }

    getLastName(){
        return this.lastname;
    }

    getUserName(){
        return this.username;
    }

    getEmail(){
        return this.email;
    }

    getPosition(){
        return this.position;
    }

    getUserType(){
        return this.usertype;
    }

    getStatus(){
        return this.status;
    }

    getDate(){
        return this.date;
    }

    getViewStatus(){
        return this.viewstatus;
    }


}