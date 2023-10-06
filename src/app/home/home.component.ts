import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]

  configUrl = 'assets/config.json';
  config: Config[] = [];
  // config: any;

  heroesUrl!: string;
  textfile!: string;
  date!: string;

  constructor(private http: HttpClient) {
    window['home'] = this;
    // this.showConfig();
  }

  ngOnInit(): void {
    this.getConfig().subscribe((tasks: any) => (this.config = tasks.hero));
  }

  getConfig() {
    return this.http.get<Config[]>(this.configUrl)
    // return this.http.get<any>(this.configUrl)
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  // showConfig() {
  //   this.getConfig()
  //     .subscribe((data: Config[]) => this.config = {
  //         heroesUrl: data.heroesUrl,
  //         textfile:  data.textfile,
  //         date: data.date,
  //       });
  // }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  addHero(config: any): Observable<any> {

    return this.http.post<any>(this.configUrl, config, httpOptions)
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  add() {
    const hero = {
      heroesUrl: this.heroesUrl,
      textfile: this.textfile,
      date: this.date
    }
    // this.config.push(hero);
    this.addHero(hero).subscribe(() => (this.config.push(hero)));
  }

  deleteHero(config: Config): Observable<Config[]> {

    const url = `${this.configUrl}/${config.id}`;
    return this.http.delete<any>(url)
      // .pipe(
      //   catchError(this.handleError)
      // );
  }

  delete(config: any) {
    console.log(config)
    this.deleteHero(config).subscribe(() =>  this.config.filter((t) => t.id !== config.id));
  }

}

export interface Config {
  id?: string;
  heroesUrl?: string;
  textfile?: string;
  date?: any;
}
