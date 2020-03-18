import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieItemComponent } from './movie-list/movie-item/movie-item.component';
import { EditComponent } from './movie-list/edit/edit.component';
import { DeleteComponent } from './movie-list/delete/delete.component';
import { AddComponent } from './movie-list/add/add.component';
import { MovieListService } from './movie-list/movie-list.service';
import { PlaceholderDirective } from './movie-list/modals/placeholder.directive';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieItemComponent,
    EditComponent,
    DeleteComponent,
    AddComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    MovieListService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditComponent,
    AddComponent,
    DeleteComponent
  ]
  
})
export class AppModule { }
