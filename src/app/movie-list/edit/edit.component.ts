import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../movie.model';
import { MovieListService } from '../movie-list.service'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../modals/modals.style.css']
})
export class EditComponent implements OnInit {
  @Input() movie: Movie;
  // movie: Movie = new Movie('1', 'Me Before you', '1990', '125', ['Action', 'Comedy'], 'Eyal Mutzary')
  @Output("close") close = new EventEmitter<void>();
  editForm: FormGroup;
  genres: string[] = ['Action', 'Comedy', 'Drama', 'Biography', 'Horror', 'Family', 'Adventure', 'Sci-Fi', 'Crime', 'Romance'];
  years: string[];
  error: string;
  

  constructor(private movieListService: MovieListService) {
    let startFrom:number = 1930;
    this.years = Array((new Date()).getFullYear() + 1 - startFrom).fill(-1).map((x,i)=>{let year = i + startFrom; return year.toString()}).reverse();
   }

  ngOnInit() {
    this.editForm = new FormGroup({
      'title': new FormControl(this.movie.title, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50)]),
      'year': new FormControl(this.movie.year, [Validators.required]),
      'runtime': new FormControl(Number(this.movie.runtime.replace(" min", "")), [Validators.required, Validators.pattern('^[1-9]+[0-9]*$'), Validators.maxLength(3)]),
      'director': new FormControl(this.movie.director, [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(50)]),
      'genre': new FormControl(this.movie.genre[0], [Validators.required])
    });
  }

  onSubmit(){
    let genre: string[] = [this.editForm.controls.genre.value];
    let title = this.editForm.controls.title.value;
    title = title.split(' ').map((word) => { return word = word[0].toUpperCase() + word.substr(1).toLowerCase(); }).join(' ');
    this.editForm.controls['title'].setValue(title);

    const movie = new Movie(this.movie.id,
    this.editForm.controls.title.value,
    this.editForm.controls.year.value,
    this.editForm.controls.runtime.value + " min",
    genre,
    this.editForm.controls.director.value);

    let titleChanged: boolean = false
    if(this.movie.title !== movie.title){
      titleChanged = true;
    }

    if(!this.movieListService.editMovie(movie, titleChanged)){
      this.error="Movie title already exists!";
      this.editForm.controls['title'].setErrors({'invalid': true});
    }
    else{
      this.error = null;
      this.close.emit();
    }
  }

  onClose(){
    this.close.emit();
  }

  

}
