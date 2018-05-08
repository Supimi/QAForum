import { OnChanges, OnInit } from '@angular/core';

export class Comment implements OnInit, OnChanges {
    _id:string;
    comment:string;
    user_posted:string;
    date_posted:any;
    constructor(){}

    ngOnInit(){}
    ngOnChanges(){}
}