// Service => data storage and retrieval

import Product from '../interfaces/IProducts';
import { generateFakeProduct } from '../Utils/fakeData';


const fakeProductsData = generateFakeProduct();

export default class ProductService {
  private readonly products: Product[] = fakeProductsData;

  findAll() {
    return this.products;
  }
}