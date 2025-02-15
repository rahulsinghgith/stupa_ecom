import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router:Router = inject(Router);
  const authToken = localStorage.getItem("authToken");
  
  if(authToken) {
    return true;
  } else {
    router.navigateByUrl("/login");
    return false;
  }
};
