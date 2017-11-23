/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BarbicanTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SocSpecificMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/soc-specific/soc-specific-my-suffix-detail.component';
import { SocSpecificMySuffixService } from '../../../../../../main/webapp/app/entities/soc-specific/soc-specific-my-suffix.service';
import { SocSpecificMySuffix } from '../../../../../../main/webapp/app/entities/soc-specific/soc-specific-my-suffix.model';

describe('Component Tests', () => {

    describe('SocSpecificMySuffix Management Detail Component', () => {
        let comp: SocSpecificMySuffixDetailComponent;
        let fixture: ComponentFixture<SocSpecificMySuffixDetailComponent>;
        let service: SocSpecificMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarbicanTestModule],
                declarations: [SocSpecificMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SocSpecificMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(SocSpecificMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SocSpecificMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocSpecificMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SocSpecificMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.socSpecific).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
