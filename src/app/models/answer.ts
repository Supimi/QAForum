import { OnChanges, OnInit } from '@angular/core';
import {Comment} from './comment';

export class Answer implements OnInit, OnChanges {
    _id:string;
    answer_content:string;
    user_posted:string;
    date_posted:string;
    ratings:string;
    comments:Comment[];

    constructor(){}

    ngOnInit(){}
    ngOnChanges(){}
}