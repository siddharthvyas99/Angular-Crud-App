import { TestBed } from '@angular/core/testing';

import { AuthDashboardService } from './auth-dashboard.service';

describe('AuthDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthDashboardService = TestBed.get(AuthDashboardService);
    expect(service).toBeTruthy();
  });
});
