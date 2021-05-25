
/**
 * Invoice stored on db
 */
export interface Invoice {
  id?: number;
  invoiceNumber?: number;
  subject?: string;
  date?: number;
  clientID: number;
  items?: InvoiceItem[];
  total?: number;
}

export interface InvoiceItem {
  text: string;
  price: number;
}
