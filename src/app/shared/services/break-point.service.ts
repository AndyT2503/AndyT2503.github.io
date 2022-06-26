import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BreakPointService {
  private readonly breakpointObserver = inject(BreakpointObserver);

  get isMobile$() {
    return this.breakpointObserver.observe(["(max-width: 768px)"]).pipe(map(res => res.matches));
  }
}