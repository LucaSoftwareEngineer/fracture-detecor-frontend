import {Component, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  ngOnInit(): void {
    initFlowbite();
  }

}
