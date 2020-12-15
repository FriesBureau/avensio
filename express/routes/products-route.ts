import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';

export class ProductRoute {

  public productRoute(app: any): void {
    app.route('/api/product/').get((req: Request, res: Response, next: NextFunction) => {
      Product.find((err, products) => {
        if (err) { return next(err); }
        res.json(products);
      });
    });

    app.route('/api/product/:id').get((req: Request, res: Response, next: NextFunction) => {
      Product.findById(req.params.id, (err, product) => {
        if (err) { return next(err); }
        res.json(product);
      });
    });

    app.route('/api/product/').post((req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);
      Product.create(req.body, (err, product) => {
        if (err) { return next(err); }
        res.json(product);
      });
    });

    app.route('/api/product/:id').put((req: Request, res: Response, next: NextFunction) => {
      Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
        if (err) { return next(err); }
        res.json(product);
      });
    });

    app.route('/api/product/:id').delete((req: Request, res: Response, next: NextFunction) => {
      Product.findByIdAndRemove(req.params.id, req.body, (err, product) => {
        if (err) { return next(err); }
        res.json(product);
      });
    });
 

  }
}
