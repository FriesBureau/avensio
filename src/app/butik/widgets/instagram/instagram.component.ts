import { Component, OnInit } from '@angular/core';
import { InstagramService } from '../../../butik/shared/services/instagram.service';
import { InstaSlider } from '../../../butik/shared/data/slider';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent implements OnInit {
  
  public instagram: any;

  constructor(private instaService: InstagramService) { 
  	this.instaService.getInstagramData.subscribe(response => this.instagram = response);
  }

  ngOnInit(): void {
  }

  public InstaSliderConfig: any = InstaSlider;

}
