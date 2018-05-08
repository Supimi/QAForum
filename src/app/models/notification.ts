import { OnChanges, OnInit } from '@angular/core';

export class Notification implements OnInit, OnChanges {
    _id: string;
    users: string[];
    date: any;
    message: string;
    status: boolean;
    reference: string;

    constructor() { }

    ngOnInit() { }
    ngOnChanges() { }

    get Id(): string {
        return this._id;
    }
    get User(): string[] {
        return this.users;
    }
    get Date(): string {
        return this.date;
    }
    get Message(): string {
        return this.message;
    }
    get Status(): boolean {
        return this.status;
    }
    get Reference(): string {
        return this.reference;
    }


}