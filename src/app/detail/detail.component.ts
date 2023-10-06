import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id!: any;

  constructor(public activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParam => {
      // console.log(queryParam);
      this.id = queryParam;
      console.log(this.id.params.id)
    });

  }

}
