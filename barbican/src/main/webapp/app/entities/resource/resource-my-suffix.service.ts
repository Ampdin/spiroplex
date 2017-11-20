import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { ResourceMySuffix } from './resource-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ResourceMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/resources';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/resources';

    constructor(private http: Http) { }

    create(resource: ResourceMySuffix): Observable<ResourceMySuffix> {
        const copy = this.convert(resource);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(resource: ResourceMySuffix): Observable<ResourceMySuffix> {
        const copy = this.convert(resource);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ResourceMySuffix> {
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
     * Convert a returned JSON object to ResourceMySuffix.
     */
    private convertItemFromServer(json: any): ResourceMySuffix {
        const entity: ResourceMySuffix = Object.assign(new ResourceMySuffix(), json);
        return entity;
    }

    /**
     * Convert a ResourceMySuffix to a JSON which can be sent to the server.
     */
    private convert(resource: ResourceMySuffix): ResourceMySuffix {
        const copy: ResourceMySuffix = Object.assign({}, resource);
        return copy;
    }
}
