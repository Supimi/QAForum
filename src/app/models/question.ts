import { OnChanges, OnInit } from '@angular/core';
import { Answer } from './answer';

export class Question implements OnInit, OnChanges {
    _id: string;
    tags: string[];
    date_posted: any;
    question_content: string;
    type: string;
    anoymous: boolean;
    user_posted: string;
    answers: Answer[];


    constructor() { }

    ngOnInit() { }
    ngOnChanges() { }

    public static displayUserPosted(anonymous: boolean, user: string): string {
        if (anonymous == false) {
            return user;
        }
        else {
            return 'Unknown user';
        }
    }



}