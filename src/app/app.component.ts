import { Component, OnInit } from '@angular/core';

import { fromEvent, Observable, Subject, Subscription, of, BehaviorSubject, ReplaySubject, AsyncSubject, from, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, flatMap, map, mapTo, repeat, switchMap, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'rxjs';

  myObservable = new Observable((observer) => {
    console.log('Observable start');
    setTimeout(() => { observer.next('1') }, 1000);
    setTimeout(() => { observer.next('2') }, 2000);
    setTimeout(() => { observer.next('3') }, 3000);
    setTimeout(() => { observer.next('4') }, 4000);
    setTimeout(() => { observer.next('5') }, 5000);
    // observer.next('1');
    // observer.next('2');
    // observer.next('3');
    // observer.next('4');
    // observer.next('5');
  });

  data = [1, 2, 3, 4, 5];
  data2 = [6, 7, 8, 9, 10];

  source$: Subject<any> = new Subject;

  canvas: any;
  ctx: any;

  // dataSubject$ = new Subject();
  // subscriptionA: Subscription = this.dataSubject$.subscribe((data: any) => {
  //   data.forEach((element: any) => {
  //     console.log('觀察者A : ' + element);
  //   });
  // });

  // observerBSubscription = this.dataSubject$.subscribe((data: any) => {
  //   console.log(`我是觀察者B，我收到${data}通知了`);
  // });

  constructor(private http: HttpClient) {
    // window['rxjs'] = this;
  }
  
  ngOnInit() {
    // this.myObservable.subscribe((value) => {
    //   console.log(value);
    // });
    
    // this.dataSubject$.next(this.data);
    
    // this.data3.pipe(map(cars => cars.map(car => `${car.brand} - ${car.model}`))).subscribe(cars => console.log(cars));
    // this.data3.pipe(map(cars => cars.filter(car => car.brand === "保時捷"))).subscribe(cars => console.log(cars));
    
    
    // this.source$.subscribe((d) => console.log(d));
    // this.source$.next('123');


    // const subscription: Subscription = this.source$.subscribe((data) => console.log(data));
    // this.source$.next('1234567890');


    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');

    // fromEvent(canvas, 'mousedown').pipe(
    //   flatMap(e => fromEvent(canvas, 'mousemove')),
    //   takeUntil(fromEvent(canvas, 'mouseup'))
    // )
    // .subscribe((e: any) => {
    //   console.log(e)
    // })

    fromEvent(this.canvas, 'mousedown').pipe(
      switchMap(e => fromEvent(this.canvas, 'mousemove')),
      takeUntil(fromEvent(this.canvas, 'mouseup')),
      repeat(),
    )
    .subscribe({
      next: (e: any) => { 
        console.log('x => ' + e.x, 'y => ' + e.y);
        this.draw(e.x, e.y); 
      },
      complete: () => console.log('complete!!'),
      error: e => console.error(e)
    })
    
  }

  data3 = of([
    {
        brand: "保時捷",
        model: "911"
    },
    {
        brand: "保時捷",
        model: "macan"
    },
    {
        brand: "法拉利",
        model: "458"
    },
    {
        brand: "蘭博基尼",
        model: "urus"
    }
  ]);

  data4 = [
    {
      brand: "保時捷",
      model: "911"
    },
    {
      brand: "保時捷",
      model: "macan"
    },
    {
      brand: "法拉利",
      model: "458"
    },
    {
      brand: "蘭博基尼",
      model: "urus"
    }
  ];

  draw(x: number, y: number) {
    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
  }

}

// fromEvent
// fromEvent(document, 'click')
//   .pipe(
//     filter((_: any, index) => index % 2 === 0),
//     map((event: MouseEvent) => ({ x: event.x, y: event.y }))
//   )
//   .subscribe((position) => {
//     console.log(`x: ${position.x}, y: ${position.y}`);
//   });


// unsubscribe
// const source = new Subject();
// const subscription: Subscription = source.subscribe((data) => console.log(data));

// source.next(1);
// source.next(2);

// subscription.unsubscribe();

// source.next(3);

// console.log(subscription.closed);


// 影片上架通知
// const youtuber$ = new Subject();
// youtuber$.next(1);
// const observerA = {
//   next(id: any) {
//     console.log(`我是觀察者 A，我收到影片 ${id} 上架通知了`);
//   },
// };

// const observerASubscription = youtuber$.subscribe(observerA);
// youtuber$.next(2);

// const observerBSubscription = youtuber$.subscribe(id => {
//   console.log(`我是觀察者 B，我收到影片 ${id} 上架通知了`);
// });

// youtuber$.next(3);
// observerBSubscription.unsubscribe();

// youtuber$.next(4);


// // Observable
// const myObservable = new Observable((observer) => {
//   observer.next('1');
// });

// myObservable.subscribe(value => console.log(value));

// // Subject
// const source = new Subject();
// const subscription: Subscription = source.subscribe(data => console.log(data));

// source.next(2);
// subscription.unsubscribe();
// source.next(3);


// const locations = new Observable((observer) => {
//   let watchId: number;

//   // Simple geolocation API check provides values to publish
//   if ('geolocation' in navigator) {
//     watchId = navigator.geolocation.watchPosition((position: GeolocationPosition) => {
//       observer.next(position);
//     }, (error: GeolocationPositionError) => {
//       observer.error(error);
//     });
//   } else {
//     observer.error('Geolocation not available');
//   }

//   // When the consumer unsubscribes, clean up data ready for next subscription.
//   return {
//     unsubscribe() {
//       navigator.geolocation.clearWatch(watchId);
//     }
//   };
// });

// // Call subscribe() to start listening for updates.
// const locationsSubscription = locations.subscribe({
//   next(position) {
//     console.log('Current Position: ', position);
//   },
//   error(msg) {
//     console.log('Error Getting Location: ', msg);
//   }
// });

// // Stop listening for location after 10 seconds
// setTimeout(() => {
//   locationsSubscription.unsubscribe();
// }, 10000);


// BehaviorSubject  一開始訂閱時會先收到一個預設值，且有事件發生後才訂閱的行為也可以收到最近一次發生過的事件資料
// const source$ = new BehaviorSubject(0);

// source$.subscribe(data => console.log(`BehaviorSubject 第一次訂閱: ${data}`));

// source$.next(1);
// source$.next(2);
// source$.subscribe(data => console.log(`BehaviorSubject 第二次訂閱: ${data}`)); 
// // BehaviorSubject會收到2(最近一次發送的值 / 在訂閱前發送的) Subject不會

// source$.next(3);
// source$.next(4);

// console.log(`目前 BehaviorSubject 的內容為: ${source$.value}`);


// ReplaySubject 訂閱時可以取得最近 N 次的事件資料
// const source$ = new ReplaySubject(3);

// source$.subscribe(data => console.log(`ReplaySubject 第一次訂閱: ${data}`));
  
// source$.next(1);
// source$.next(2);

// source$.subscribe(data => console.log(`ReplaySubject 第二次訂閱: ${data}`));

// source$.next(3);
// source$.next(4);

// source$.subscribe(data => console.log(`ReplaySubject 第三次訂閱: ${data}`));


// AsyncSubject 直到 complete() 被呼叫後，才會收到「最後一次事件資料」
// const source$ = new AsyncSubject();

// source$.subscribe(data => console.log(`AsyncSubject 第一次訂閱: ${data}`));
  
// source$.next(1);
// source$.next(2);

// source$.subscribe(data => console.log(`AsyncSubject 第二次訂閱: ${data}`));

// source$.next(3);
// source$.next(4);

// source$.subscribe(data => console.log(`AsyncSubject 第三次訂閱: ${data}`));

// source$.complete();


// asObservable 把資料流傳出去，又能不讓產生新事件
// class Student {
//   private _score$ = new Subject();

//   get score$() {
//     return this._score$.asObservable();
//   }

//   updateScore(score: any) {
//     // 大於 60 分才允許推送成績事件
//     if(score > 60){
//       this._score$.next(score);
//     }
//   }
// }

// const mike = new Student();

// mike.score$.subscribe(score => {
//   console.log(`目前成績：${score}`);
// });

// mike.updateScore(70); // 目前成績: 70
// mike.updateScore(50); // (沒有任何反應)
// mike.updateScore(80); // 目前成績: 80
// mike.score$.next(50); // (錯誤：next is not a function)


// Observable vs Subject
// const observable$ = new Observable(observer => observer.next(Math.ceil(Math.random()*100)));
// observable$.subscribe(num => console.log('observable 1 => ' + num));
// observable$.subscribe(num => console.log('observable 2 => ' + num));

// const subject$ = new Subject();
// subject$.subscribe(num => console.log('subject 1 => ' + num));
// const subject2: Subscription = subject$.subscribe(num => console.log('subject 2 => ' + num));

// subject$.next(Math.ceil(Math.random()*100));
// subject2.unsubscribe();
// subject$.next(66666);


// Subject ajax
// const subject$ = new Subject();
// const data = ajax('http://jsonplaceholder.typicode.com/users');

// subject$.subscribe(d => console.log(d));
// const result = data.subscribe(subject$);


// const observable$ = new Observable((observer) => observer.next('0987654321'));
// const subscriptionA: Subscription = observable$.subscribe((data) => console.log(data));

// const subject$ = new Subject();
// const subscriptionB: Subscription = subject$.subscribe((data) => console.log(data));
// subject$.next('1234567890');

