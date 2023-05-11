import {TestBed} from '@angular/core/testing';

import {UpdateRatingService} from './update-rating.service';

describe('UpdateRatingService', () => {
    let service: UpdateRatingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UpdateRatingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
