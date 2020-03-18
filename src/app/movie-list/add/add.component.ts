import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../movie.model';
import { MovieListService } from '../movie-list.service'


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['../modals/modals.style.css']
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  genres: string[] = ['Action', 'Comedy', 'Drama', 'Biography', 'Horror', 'Family'];
  years: string[];
  @Output("close") close = new EventEmitter<void>();
  error: string;

  constructor(private movieListService: MovieListService) {
    let startFrom:number = 1930;
    this.years = Array((new Date()).getFullYear() + 1 - startFrom).fill(-1).map((x,i)=>{let year = i + startFrom; return year.toString()}).reverse();
   }

  ngOnInit() {
    this.addForm = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50)]),
      'year': new FormControl(null, [Validators.required]),
      'runtime': new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$'), Validators.maxLength(3)]),
      'director': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(50)]),
      'genre': new FormControl(null, [Validators.required])
    });
  }

  onSubmit(){
    let genre: string[] = [this.addForm.controls.genre.value];
    let title = this.addForm.controls.title.value;
    title = title.split(' ').map((word) => { return word = word[0].toUpperCase() + word.substr(1).toLowerCase(); }).join(' ');
    this.addForm.controls['title'].setValue(title);

    const movie = new Movie(this.movieListService.getMovieList().length.toString(),
    this.addForm.controls.title.value,
    this.addForm.controls.year.value,
    this.addForm.controls.runtime.value + ' min',
    genre,
    this.addForm.controls.director.value);
    if(!this.movieListService.addMovie(movie)){
      this.error="Movie title already exists!";
      this.addForm.controls['title'].setErrors({'invalid': true});
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
