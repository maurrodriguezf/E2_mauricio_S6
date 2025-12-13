import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ItemListComponent } from '../components/item-list/item-list.component';
import { CardGalleryComponent } from '../components/card-gallery/card-gallery.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    // standalone components
    ItemListComponent,
    CardGalleryComponent,
    TaskFormComponent,
    // import standalone page instead of declaring
    HomePage
  ],
  declarations: []
})
export class HomePageModule {}
