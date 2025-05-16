import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');
  const adminOnlyRoutes = ['add-device', 'add-service-type'];

  console.log('isLoggedIn:', isLoggedIn, 'userRole:', userRole, 'route:', route.routeConfig?.path);


  if (!isLoggedIn) {
    window.location.href = '/login';
    return false;
  }

  if (adminOnlyRoutes.includes(route.routeConfig?.path || '') && userRole !== 'admin') {
    window.location.href = '/home';
    return false;
  }

  return true;
};