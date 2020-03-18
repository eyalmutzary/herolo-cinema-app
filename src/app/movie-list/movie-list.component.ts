import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Movie } from './movie.model';
import { MovieListService } from './movie-list.service';
import { PlaceholderDirective } from './modals/placeholder.directive';
import { AddComponent } from './add/add.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movieList: Movie[];
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private movieListService: MovieListService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.movieListService.fetchMovie();
    this.movieList = this.movieListService.getMovieList();
  }

  updateList(){
    this.movieList = this.movieListService.getMovieList();
  }

  showAddAlert(){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AddComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });

    // this.closeSub = componentRef.instance.close.subscribe(() => {
    //   this.closeSub.unsubscribe();
    //   hostViewContainerRef.clear();
    // });
  }
}
