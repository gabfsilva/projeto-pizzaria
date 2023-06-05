import { Request, Response } from 'express';
import { ShowOrderInProgressService } from '../../services/order/ShowOrderInProgressService';

class ShowOrderInProgressController {
    async handle(req: Request, res: Response) {
        const showOrderInProgress = new ShowOrderInProgressService();

        const orders = await showOrderInProgress.execute();

        return res.json(orders);
    }
}

export { ShowOrderInProgressController }