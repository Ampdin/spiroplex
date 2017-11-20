import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { DisciplineMySuffix } from './discipline-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DisciplineMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/disciplines';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/disciplines';

    constructor(private http: Http) { }

    create(discipline: DisciplineMySuffix): Observable<DisciplineMySuffix> {
        const copy = this.convert(discipline);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(discipline: DisciplineMySuffix): Observable<DisciplineMySuffix> {
        const copy = this.convert(discipline);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DisciplineMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to DisciplineMySuffix.
     */
    private convertItemFromServer(json: any): DisciplineMySuffix {
        const entity: DisciplineMySuffix = Object.assign(new DisciplineMySuffix(), json);
        return entity;
    }

    /**
     * Convert a DisciplineMySuffix to a JSON which can be sent to the server.
     */
    private convert(discipline: DisciplineMySuffix): DisciplineMySuffix {
        const copy: DisciplineMySuffix = Object.assign({}, discipline);
        return copy;
    }
}
