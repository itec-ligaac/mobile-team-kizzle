import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Coordinates } from '@ionic-native/geolocation/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
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

  @Input('interest') public interest: BehaviorSubject<string>;
  @Input('color') public color: BehaviorSubject<string>;



  public platform:any;
  public map:any;
  public defaultLayers:any;
  public routing:any;
  public points = new BehaviorSubject<[any]>([null]);

  constructor(private nativeStorage: NativeStorage) { }

  ngOnInit() {}

  drawHeatMap(map,coords){
    this.clearMap(map);
    if(coords.length>1){
      for(var i=1;i<coords.length;i++){
        this.drawCircle(map,coords[i][0],coords[i][1]);
      }
    }
  }

  drawCircle(map,lat,lng){
    map.addObject(new H.map.Circle(
      // The central point of the circle
      {lat:lat, lng:lng},
      // The radius of the circle in meters
      100,
      {
        style: {
          strokeColor: 'rgba(0, 0, 0, 0)', // Color of the perimeter
          lineWidth: 3,
          fillColor: 'rgba('+this.color.getValue()+', 0.1)'  // Color of the circle
        }
      }
    ));
  }

  clearMap(map){
    for (var object of map.getObjects()){
      map.removeObject(object);
    }
  }

  getInterestPoints(id:string){

    this.nativeStorage.getItem('jwt').then(data=>{
      var points = [];

      var http = new XMLHttpRequest();
      var url = 'http://milsugi.tech:5000/api/location/all';
  
      var location = this.location.getValue();

      var params = 'interest='+this.interest.getValue()+"&lat="+location[0]+"&long="+location[1];
  
      http.open('POST', url, true);
  
      
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.setRequestHeader('Authorization', data);
  
  
      http.onreadystatechange = ()=> {
          if(http.readyState == 4 && http.status == 200) {
              if(JSON.parse(http.responseText)){
                var response = JSON.parse(http.responseText).message;

                var points = this.points.getValue();

                for(var i=0;i<response.length;i++){
                  points.push([response[i].lat,response[i].long]);
                }
                this.points.next(points);

              }
          }else{
            console.log(http.status);
          }
      }
      http.withCredentials = true;
      http.send(params);
  
    });
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
        this.map.setCenter({lat:val[0], lng:val[1]});
      });

      this.zoom.subscribe((val)=>{
        this.map.setZoom(val);
      });

      this.interest.subscribe((val)=>{
        this.getInterestPoints(val);
      });

      this.points.subscribe((val)=>{
        this.drawHeatMap(this.map,val);
      });
     

    },2000);
    
  

  }
  
}
