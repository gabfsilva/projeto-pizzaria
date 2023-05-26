import prismaClient from "../../prisma";

interface RequestIdItem {
    item_id: string
}

class RemoveItemService {
    async execute({ item_id }: RequestIdItem) {
        const item = prismaClient.item.delete({
            where: {
                id: item_id
            }
        });

        return item;
    }
}

export { RemoveItemService }