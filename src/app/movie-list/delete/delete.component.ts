import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['../modals/modals.style.css']
})
export class DeleteComponent implements OnInit {
  @Output("delete") delete = new EventEmitter<void>();
  @Output("close") close = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit() {
  }
  
  onDelete(){
    this.delete.emit();
  }

  onClose(){
    this.close.emit();
  }
}
