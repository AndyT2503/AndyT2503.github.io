import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BreakPointService {

  constructor(
    private breakpointObserver: BreakpointObserver,
  ){}

  get isMobile$() {
    return this.breakpointObserver.observe(["(max-width: 768px)"]).pipe(map(res => res.matches));
  }
}