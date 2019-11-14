import { getRepository } from "typeorm";
import { News } from "../entity/News";

export class NewsService {
    static async persistNews(newNews: News): Promise<News> {    
        
        const news = getRepository(News).save(newNews);

        return news;
    }

    static async findNews(id?: number): Promise<News[]> {
        let newsQuery = getRepository(News).createQueryBuilder('news');
        
        if (id) {
            newsQuery = newsQuery.where('news.id = :id', {id: id});
        }

        const news = await newsQuery
            .leftJoinAndSelect('news.user', 'user')
            .getMany();

        return news;
    }
}
