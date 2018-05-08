import { OnChanges, OnInit } from '@angular/core';

export abstract class User implements OnInit, OnChanges {
    private token: string;
    private _id: string;
    private firstname: string;
    private lastname: string;
    private username: string;
    private email: string;

    ngOnInit() { }

    ngOnChanges() { }
    constructor(attributes: any) {
        this.username = attributes.username;
        this._id = attributes._id;
        this.firstname = attributes.firstname;
        this.lastname = attributes.lastname;
        this.email = attributes.email;
    }

    setToken(value: any) {
        this.token = value;
    }

    set_id(value: any) {
        this._id = value;
    }

    setFirstName(value: any) {
        this.firstname = value;
    }

    setLastName(value: any) {
        this.lastname = value;
    }
    setUsername(value: any) {
        this.username = value;
    }

    setEmail(value: any) {
        this.email = value;
    }

    //attribute getters
    getToken(): any {
        return this.token;
    }

    get_id(): any {
        return this._id;
    }

    getFirstName(): any {
        return this.firstname;
    }

    getLastName(): any {
        return this.lastname;
    }

    getUserName(): any {
        return this.username;
    }

    getEmail(): any {
        return this.email;
    }
    


}