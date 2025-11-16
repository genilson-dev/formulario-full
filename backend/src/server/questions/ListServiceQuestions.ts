import prismaDB from "../../prisma";

class ListServiceQuestions {
    async execute(id: string){
        const questions = await prismaDB.question.findMany({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                ativo: true
            },
            orderBy:{
                title: 'asc',
                created_at: "desc" 
            }
        })
        return questions;
    }
}

export default ListServiceQuestions;
