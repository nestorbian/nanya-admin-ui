import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.userService.getUserBySession().subscribe((data) => {
                if (data['data']) {
                    resolve(false);
                    this.router.navigate(['/home']);
                } else {
                    resolve(true);
                }
            }, (err: HttpErrorResponse) => {
                resolve(true);
            });
        });
    }
}
