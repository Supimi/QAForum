import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionService } from '../../../services/question.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  search_txt: String;
  user: any;
  search_results:any;

  constructor(private _formBuilder: FormBuilder, private _questionService: QuestionService) {
    this.search_txt = '';
    this.searchForm = _formBuilder.group({
      'search_txt': [null, Validators.required]
    });
    // Retrieve the object from localStorage
    var userObject = localStorage.getItem('userObject');

    // console.log retrieved item
    this.user = JSON.parse(userObject);

  }

  ngOnInit() {

  }

  //function is called on focus event of the serch input box
  keyPressed() {
    console.log('keypressed');
    var searchtxt = document.getElementById("search-title");
    searchtxt.style.display = "none";
  }

  //function is called on blur event of the serch input box 
  keyReleased() {
    console.log('keyReleased');
    var searchtxt = document.getElementById("search-title");
    searchtxt.style.display = "block";
  }

  search(post) {
    console.log('Search');
    //this.searchForm.submit();
    //document.getElementById('submit_btn').click();
    this.search_txt = post.search_txt;
    console.log(post.search_txt,post)
    this._questionService.qSearch(this.search_txt, this.user.token).subscribe(ques => {
      this.search_results=ques;
      console.log(ques,'results');
    }, error => {
      console.log(error);
      console.log('Error in accessing DB');

    });

    if(this.search_results!=[]){
      this.freeze();
      document.getElementById('resultModal').style.display='block';

    }



    this.searchForm.reset();

  }

  freeze() {
    var top= window.scrollY;
      
    document.body.style.overflow= 'hidden';
  
    window.onscroll= function() {
      window.scroll(0, top);
    }
  }
  
  unfreeze() {
    document.body.style.overflow= '';
    window.onscroll= null;
  }

  close(){
    document.getElementById('resultModal').style.display='none';
    this.unfreeze();
  }


}



