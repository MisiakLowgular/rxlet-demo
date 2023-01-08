import { Component } from '@angular/core';
import { FunFactsService } from './fun-facts.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  funFact$: Observable<string> = this._funFactsService.getFunFactsStream();

  constructor(private readonly _funFactsService: FunFactsService) {}

  loadingTrigger$: Subject<void> = new Subject<void>();

  onNextClicked(): void {
    this.loadingTrigger$.next();
    this._funFactsService.getNextFunFact();
  }
}
