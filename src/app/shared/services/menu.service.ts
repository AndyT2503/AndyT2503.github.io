import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private currentMenuSelected$ = new BehaviorSubject<string>('');

  getCurrentMenuSelected() {
    return this.currentMenuSelected$.asObservable();
  }

  updateCurrentMenuSelected(name: string) {
    this.currentMenuSelected$.next(name);
  }
}
