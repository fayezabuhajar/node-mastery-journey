// Service => data storage and retrieval
import Product from '../interfaces/IProducts';


type ProductBody = {
    title: string;
    price: number
    description: string;
}

export default class ProductService {
  constructor(private products: Product[]) {
    this.products = products;
  }

  findAll() {
    return this.products;
  }

  filterByQuery(filterQuery?: string) {
    if (filterQuery) {
      const propertiesToFilter = filterQuery.split(",");
      let filteredProducts = [];

      filteredProducts = this.findAll()?.map((product) => {
        const filteredProduct: any = {};
        propertiesToFilter.forEach((prop) => {
          if (product.hasOwnProperty(prop as keyof Product)) {
            filteredProduct[prop] = product[prop as keyof Product];
          }
        });
        return { id: product.id, ...filteredProduct };
      });
      return filteredProducts;
    }
  }

  filterById(productId: number) {
    const findProduct = this.findAll().find((p) => p.id === productId);
    return findProduct;
  }

  createProduct(productBody: ProductBody) {
    this.findAll().push({
      id: this.findAll().length + 1,
      title: productBody.title,
      price: productBody.price,
      description: productBody.description,
    });
    return this.findAll()[this.findAll().length - 1];
  }

    updateProductByIndex(index: number, productBody: ProductBody) {
        const products = this.findAll();
        const existing = products[index];
        if (!existing) {
            throw new Error('Product not found');
        }
        const updated: Product = { ...existing, ...productBody, id: existing.id };
        products[index] = updated;
        return updated;
    }



    deleteProductByIndex(index: number) {
        const products = this.findAll();
        const existing = products[index];
        if (!existing) {
            throw new Error('Product not found');
        }
        products.splice(index, 1);
        return true;
    }
}

// console.log(req.params);
    
//     const productId = +req.params.id;
//     if (isNaN(productId)) {
//         return res.status(400).send({ error: 'Invalid product ID' });
//     }

//     const findProduct = fakeProductsData.find(p => p.id === productId);

//     if (findProduct) {
//         return res.send(findProduct);
//     }
//     else {
//         return res.status(404).send({ error: 'Product not found' });
//     }

// filter by keyOf IProduct
    // const filterQuery = req.query.filter as string;

    // if (filterQuery) {
    //     const propertiesToFilter = filterQuery.split(',') 

    //     let filteredProducts: any[] = [];

    //     filteredProducts = fakeProductsData.map(product => {
    //         const filteredProduct: any = {};
    //         propertiesToFilter.forEach(prop => {
    //             if (product.hasOwnProperty(prop as keyof IProduct)) {
    //                 filteredProduct[prop] = product[prop as keyof IProduct];
    //             }
    //         });
    //         return { id: product.id, ...filteredProduct };
    //     });

    //     return res.send(filteredProducts);
    // } else {
    //     return res.send(fakeProductsData);
    // }

