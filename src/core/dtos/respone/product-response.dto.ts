import { GroupResponse } from './group-response.dto';

export class ProductResponse {
  productName: string;
  discrption: string;
  price: number;
  inStock: number;
  group: GroupResponse;
}
