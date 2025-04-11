import { Component, OnInit } from '@angular/core';
import { ProfileObject } from '../../shared/constant';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profileObject = ProfileObject;

  selectedIndex: number = 0;

  ngOnInit(): void {
      this.selectedIndex = 0;
  }

  reload(index: number): void {
    this.selectedIndex = index;
  }
}