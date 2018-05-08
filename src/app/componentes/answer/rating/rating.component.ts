import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor() { } 

  @Input() rating: number;
  @Input() ansId: any;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputsName: string;
  ngOnInit() {
    this.inputsName = this.ansId + '_rating';
  }
  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.ansId,
      rating: rating
    });
  }

}
