import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ProvinceDTO } from "../../models/province.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProvinceService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<ProvinceDTO[]> {
        return this.http.get<ProvinceDTO[]>(`${API_CONFIG.baseUrl}/provinces`);
    }
}