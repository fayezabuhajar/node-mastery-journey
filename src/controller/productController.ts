import Product from "../interfaces/IProducts";
import ProductService from "../services/ProductService";
import { Request, Response } from "express";

export default class ProductController {
  constructor(private productService: ProductService) { }
  // methods

  getAllProducts(req: Request, res: Response): Product[] | any {
    const filterQuery = req.query.filter as string;
    if (filterQuery) {
      return res
        .status(200)
        .send(this.productService.filterByQuery(filterQuery));
    }
    return res.status(200).send(this.productService.findAll());
  }

  getProductById(req: Request, res: Response): Product | undefined {
    const pId = req.params.id;
    if (typeof pId === "undefined") {
      res.status(400).send({ error: "Product ID is required" });
      return;
    }
    const productId = +pId;

    if (isNaN(productId)) {
      res.status(404).send("Invalid product ID");
    }

    res.status(200).send(this.productService.filterById(productId));
  }

  createProduct(req: Request, res: Response): Product | undefined {
    if (!req.body) {
      res.status(400).send({ error: "Product data is required" });
      return;
    }
    const productBody = req.body;

    const newProduct = this.productService.createProduct(productBody);
    if (!newProduct) {
      res.status(400).send({ error: "Invalid product data" });
      return;
    }
    res.status(201).send(newProduct);
    return newProduct;
  }


  updateProduct(req: Request, res: Response) {
    
    if (typeof req.params.id === "undefined") {
      res.status(400).send({ error: "Product ID is required" });
    }
    else {
      const idParam = +req.params.id;

      const productId = idParam;
      if (isNaN(productId)) {
        res.status(400).send({ error: "Invalid product ID" });
      }

      const products = this.productService.findAll();
      const productIndex: number = products.findIndex((p) => p.id === productId);

      if (productIndex < 0) {
        res.status(404).send({ error: "Product not found" });
      }

      const productBody = req.body;
      this.productService.updateProductByIndex(productIndex, productBody);
      res.status(200).send({
        message: "Product updated successfully",
        product: this.productService.findAll()[productIndex],
      });
    }
  }
  
  deleteProduct(req: Request, res: Response) {
    if (typeof req.params.id === "undefined") {
      res.status(400).send({ error: "Product ID is required" });
    }
    else {
      const idParam = +req.params.id;
      if (typeof idParam === "undefined") {
        res.status(400).send({ error: "Product ID is required" });
      }
      const productId = idParam;
      if (isNaN(productId)) {
        res.status(400).send({ error: "Invalid product ID" });
      }
      const products = this.productService.findAll();
      const productIndex: number = products.findIndex((p) => p.id === productId);
      if (productIndex < 0) {
        res.status(404).send({ error: "Product not found" });
      }
      this.productService.deleteProductByIndex(productIndex);
      res.status(200).send({ message: "Product deleted successfully" });
    }
  }
}
