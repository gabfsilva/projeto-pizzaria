import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){
        // Verificações

        //E-mail não fornecido
        if(!email){
            throw new Error("O campo de e-mail é obrigatório!");
        }

        //E-mail já cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("Esse e-mail já está cadastrado!");
        }
        // ----------------------------------------------------------------------

        const passwordHash = await hash(password, 8)

        // Cadastrando um usuário no banco de dados
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })


        return user;
    }
}

export { CreateUserService }