import { Injectable } from '@nestjs/common';
import {animationFrameScheduler, asapScheduler, asyncScheduler, of, Observable, interval } from 'rxjs';
import { flatMap, observeOn } from 'rxjs/operators';

@Injectable()
export class WorkerService {

    constructor(){
       /* const intervals = interval(10);                // Intervals are scheduled
                                               // with async scheduler by default...
        intervals.pipe(
        observeOn(asyncScheduler),          // ...but we will observe on animationFrame
        )                                              // scheduler to ensure smooth animation.
        .subscribe(val => {
            this.processWithWorker;
        });*/
      of(1,2).pipe(flatMap(this.processWithWorker))
        .subscribe(console.log);
      console.log("Before or after?")
      
    }

    public async processWithWorker(value: any) {
        return new Observable(subscriber => {
          const myWorker = new Worker('');
          myWorker.onmessage = result => {
            subscriber.next(result);
            subscriber.complete();
            subscriber.add()
            myWorker.terminate();
          }
          myWorker.postMessage(value);
        });
      }
}