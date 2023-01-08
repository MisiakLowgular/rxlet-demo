import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable } from 'rxjs';

const FUN_FACTS = [
  'Shakespeare is quoted 33,150 times in the Oxford English dictionary.',
  'Celery has negative calories! It takes more calories to eat a piece of celery than the celery has in it.',
  'The placement of a donkey`s eyes in its` heads enables it to see all four feet at all times!',
  'Mosquito repellents don`t repel. They hide you. The spray blocks the mosquito`s sensors so they don`t know you`re there.',
  'Because of the rotation of the earth, an object can be thrown farther if it is thrown west.',
];

@Injectable({ providedIn: 'root' })
export class FunFactsService {
  private _subject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public getFunFactsStream(): Observable<string> {
    return this._subject.asObservable().pipe(
      delay(2000),
      map((index) => FUN_FACTS[index])
    );
  }

  public getNextFunFact(): void {
    this._subject.next(this._subject.value + 1);
    if (this._subject.value === FUN_FACTS.length - 1) {
      this._subject.complete();
    }
  }

  public forceError(): void {
    this._subject.error('There was and error');
  }

  public reset(): void {
    this._subject = new BehaviorSubject<number>(0);
  }
}
