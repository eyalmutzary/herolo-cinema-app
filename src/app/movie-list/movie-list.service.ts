import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.model';


export interface MovieResponseData{
  imdbID:string;
  Title:string;
  Year:string;
  Runtime:string;
  Genre:string;
  Director:string;
}

@Injectable({
  providedIn: 'root'
})

export class MovieListService {
  private movieList: Movie[] = [
  ];

  constructor(private http: HttpClient) { }

  fetchMovie() {
    let apikey = '4ee7b307'
    let movieNames = ['me+before+you', 'hunger+games', 'pulp+fiction']
    for(let name of movieNames){
      this.http.get<MovieResponseData>('http://www.omdbapi.com/?t=' + name + '&apikey=' + apikey).subscribe(
      resData => {
        let movie = new Movie(resData.imdbID, resData.Title, resData.Year, resData.Runtime, resData.Genre.split(','), resData.Director);
        this.movieList.push(movie);
      }
    );
    }
  }

  getMovieList(){
    return this.movieList;
  }

  deleteMovie(movie: Movie){
    this.movieList = this.movieList.filter(item => item.id !== movie.id);
  }

  addMovie(movie: Movie){
    if(this.movieList.findIndex(x => x.title === movie.title) === -1){
      this.movieList.push(movie);
      return true;
    }
    return false;
  }

  editMovie(movie: Movie, titleChanged: boolean){
    let titleExists: boolean = this.movieList.findIndex(x => x.title === movie.title) !== -1;
    if((titleExists && !titleChanged) || (!titleExists)){
      let index = this.movieList.findIndex(x => x.id === movie.id);
      this.movieList[index] = movie;
      return true;
    }
    return false;
    
  }


  // Add an option to add multiple genres

  
}
