import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { InvoiceDTO } from "../../models/invoice.dto";

@Injectable()
export class InvoiceService {
    constructor(public http: HttpClient){}

    insert(obj: InvoiceDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/invoices`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}