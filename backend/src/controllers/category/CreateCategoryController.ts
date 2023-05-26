import { Request, Response } from 'express';
import { CreateCategoryServer } from '../../services/category/CreateCategoryServer';

class CreateCategoryController{
    async handle(req: Request, res: Response) {
        const { name } = req.body;

        const createCategoryService = new CreateCategoryServer();

        const category = await createCategoryService.execute({ name });

        return res.json(category);

    }
}

export { CreateCategoryController }