import Product from "../interfaces/IProducts";
import ProductService from "../services/ProductService";

export default class ProductController {
  constructor( private productService: ProductService) {}
  // methods

  getAllProducts() {
    return this.productService.findAll();
  }
}