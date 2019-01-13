
import { Resolve } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Injectable()
export class WellKnownTeaResolve implements Resolve<any> {
    constructor(private userService: UserService, private router: Router) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const wellKnownTeaId = route.paramMap.get('id');
        if (wellKnownTeaId) {
            return new Promise((resolve, reject) => {
                this.userService.getWellKnownTeaById(wellKnownTeaId).subscribe((data) => {
                    if (data['status']) {
                        resolve(data['data']);
                    } else {
                        reject(data['message']);
                    }
                });
            });
        } else {
            this.router.navigate(['/home/index']);
        }
    }
}