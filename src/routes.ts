import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController'

import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';

import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';

import { SendOrderController } from './controllers/order/SendOrderController';
import { ShowOrderInProgressController } from './controllers/order/ShowOrderInProgressController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderService } from './services/order/FinishOrderService';

import { isAutheticated } from './middlewares/isAutheticated';

import uploadConfig from './config/multer';
import { FinishOrderController } from './controllers/order/FinishOrderController';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- Rotas do Usuário
router.post('/users', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle);
router.get('/me', isAutheticated, new DetailUserController().handle);

// -- Rotas de Categorias
router.post('/category', isAutheticated, new CreateCategoryController().handle);
router.get('/category', isAutheticated, new ListCategoryController().handle);

// -- Rotas de Produtos
router.post('/product', isAutheticated, upload.single("file"), new CreateProductController().handle);
router.get('/category/product', isAutheticated, new ListByCategoryController().handle);

// -- Rotas de Pedidos
router.post('/order', isAutheticated, new CreateOrderController().handle);
router.delete('/order', isAutheticated, new RemoveOrderController().handle);

router.post('/order/add', isAutheticated, new AddItemController().handle);
router.delete('/order/remove', isAutheticated, new RemoveItemController().handle);

router.put('/order/send', isAutheticated, new SendOrderController().handle);
router.get('/orders', isAutheticated, new ShowOrderInProgressController().handle);
router.get('/order/detail', isAutheticated, new DetailOrderController().handle);
router.put('/order/finish', isAutheticated, new FinishOrderController().handle);

export { router };