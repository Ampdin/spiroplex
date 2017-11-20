/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BarbicanTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LessonMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/lesson/lesson-my-suffix-detail.component';
import { LessonMySuffixService } from '../../../../../../main/webapp/app/entities/lesson/lesson-my-suffix.service';
import { LessonMySuffix } from '../../../../../../main/webapp/app/entities/lesson/lesson-my-suffix.model';

describe('Component Tests', () => {

    describe('LessonMySuffix Management Detail Component', () => {
        let comp: LessonMySuffixDetailComponent;
        let fixture: ComponentFixture<LessonMySuffixDetailComponent>;
        let service: LessonMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarbicanTestModule],
                declarations: [LessonMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LessonMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(LessonMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LessonMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LessonMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LessonMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.lesson).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
