/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BarbicanTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SkillsMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/skills/skills-my-suffix-detail.component';
import { SkillsMySuffixService } from '../../../../../../main/webapp/app/entities/skills/skills-my-suffix.service';
import { SkillsMySuffix } from '../../../../../../main/webapp/app/entities/skills/skills-my-suffix.model';

describe('Component Tests', () => {

    describe('SkillsMySuffix Management Detail Component', () => {
        let comp: SkillsMySuffixDetailComponent;
        let fixture: ComponentFixture<SkillsMySuffixDetailComponent>;
        let service: SkillsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BarbicanTestModule],
                declarations: [SkillsMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SkillsMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(SkillsMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkillsMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkillsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SkillsMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.skills).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
