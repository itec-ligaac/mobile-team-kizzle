import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryMapPageRoutingModule } from './history-map-routing.module';

import { HistoryMapPage } from './history-map.page';
import { HereMapComponent } from './here-map/here-map.component';
import {InterestSelectorComponent} from './interest-selector/interest-selector.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryMapPageRoutingModule
  ],
  declarations: [HistoryMapPage,HereMapComponent,InterestSelectorComponent]
})
export class HistoryMapPageModule {}
