import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, EventEmitter, Output } from '@angular/core';
import { Movie } from '../movie.model';
import { MovieListService } from '../movie-list.service';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';
import { PlaceholderDirective } from '../modals/placeholder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private confirmSub: Subscription;
  private closeSub: Subscription;
  @Output() updated = new EventEmitter();
  private hover: boolean = false;

  constructor(private movieListService:MovieListService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  showDeleteAlert(){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(DeleteComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    this.confirmSub = componentRef.instance.delete.subscribe(() => {
      this.confirmSub.unsubscribe();
      hostViewContainerRef.clear();
      this.movieListService.deleteMovie(this.movie);
      this.updated.emit();
    });

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  showEditAlert(){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(EditComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.movie = this.movie;

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
