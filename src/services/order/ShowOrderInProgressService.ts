import prismaClient from "../../prisma";


class ShowOrderInProgressService {
    async execute() {
        const order = await prismaClient.order.findMany({
            where: {
                status: false,
                draft: false
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return order;
    }
}

export { ShowOrderInProgressService }