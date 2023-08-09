import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private currentMenuSelected = signal('')

  getCurrentMenuSelected() {
    return this.currentMenuSelected.asReadonly();
  }

  updateCurrentMenuSelected(name: string) {
    this.currentMenuSelected.update(() => name);
  }
}
