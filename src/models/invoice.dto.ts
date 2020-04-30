import { RefDTO } from "./ref.dto";
import { PaymentDTO } from "./payment.dto";
import { ItemInvoiceDTO } from "./item-invoice.dto";

export interface InvoiceDTO {
    client : RefDTO;
    shippingAddress : RefDTO;
    payment : PaymentDTO;
    items : ItemInvoiceDTO[];
    
}