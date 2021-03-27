import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Coordinates } from '@ionic-native/geolocation/ngx';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

let H = window['H'];

@Component({
  selector: 'here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss'],
})

export class HereMapComponent implements OnInit {

  @ViewChild("map") public mapElement: ElementRef;

  @Input('apiKey') public apiKey: string;

  @Input('location') public location: BehaviorSubject<[any,any]>;
  @Input('zoom') public zoom: BehaviorSubject<number>;


  public platform:any;
  public map:any;
  public defaultLayers:any;
  public routing:any;

  constructor() { }

  ngOnInit() {}

  drawHeatMap(map,coords){
    for(var i=0;i<coords.length;i++){
      this.drawCircle(map,coords[i][0],coords[i][1]);
    }
  }

  drawCircle(map,lat,lng){
    map.addObject(new H.map.Circle(
      // The central point of the circle
      {lat:lat, lng:lng},
      // The radius of the circle in meters
      1000,
      {
        style: {
          strokeColor: 'rgba(0, 0, 0, 0)', // Color of the perimeter
          lineWidth: 3,
          fillColor: 'rgba(0, 128, 0, 0.5)'  // Color of the circle
        }
      }
    ));
  }

  

  ngAfterViewInit() {

    

    setTimeout(()=>{
      this.platform = new H.service.Platform({
        'apikey': this.apiKey,
      });
  
      this.defaultLayers = this.platform.createDefaultLayers();

      

      var loc = this.location.getValue();

      this.map = new H.Map(
        this.mapElement.nativeElement, 
        this.defaultLayers.vector.normal.map, 
        {
          zoom: this.zoom.getValue(),
          center: { lat: loc[0], lng: loc[1] },
          pixelRatio: window.devicePixelRatio || 1
  
        }
      );

      let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

      

      this.location.subscribe((val)=>{
        this.drawHeatMap(this.map,[[this.location.getValue()[0],this.location.getValue()[1]],[this.location.getValue()[0]+0.1,this.location.getValue()[1]+0.2]]);
        this.map.setCenter({lat:val[0], lng:val[1]});
      });

      this.zoom.subscribe((val)=>{
        this.map.setZoom(val);
      });

     
     

    },2000);
    
  

  }
  
}
