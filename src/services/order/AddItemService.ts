import prismaClient from "../../prisma";

interface RequestItem {
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemService {
    async execute({ order_id, product_id, amount }: RequestItem){
        const item = prismaClient.item.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                amount: amount
            }
        });

        return item;
    }
}

export { AddItemService }