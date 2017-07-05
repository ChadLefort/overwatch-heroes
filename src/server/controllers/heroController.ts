import { Request, Response } from 'express';
import { Body, Controller, Get, Post, Req, Res, UrlParam } from 'giuseppe';
import { connection } from '../';
import { Hero } from '../models/hero';

@Controller('hero')
export class HeroController {

    @Get('create')
    public create( @Req() req: Request, @Res() res: Response): void {
        connection
            .then(async (connection) => {
                const heroRepository = connection.getRepository(Hero);

                for (let i = 1; i <= 24; i++) {
                    const hero = new Hero();
                    hero.isFavorite = false;

                    await heroRepository.persist(hero);
                }
            })
            .catch((error) => console.log(error));

        res.sendStatus(200);
    }

    @Get()
    public favorites( @Req() req: Request, @Res() res: Response): void {
        connection
            .then(async (connection) => res.json(await connection.getRepository(Hero).find()))
            .catch((error) => console.log(error));
    }

    @Get(':id')
    public favoritesById( @UrlParam('id') id: number, @Req() req: Request, @Res() res: Response): void {
        connection
            .then(async (connection) => res.json(await connection.getRepository(Hero).findOneById(id)))
            .catch((error) => console.log(error));
    }

    @Post(':id')
    public updateFavorites( @UrlParam('id') id: number, @Req() req: Request, @Res() res: Response): void {
        connection
            .then(async (connection) => {
                const heroRepository = connection.getRepository(Hero);
                const heroToUpdate = await heroRepository.findOneById(id);
                heroToUpdate.isFavorite = req.body.isFavorite;
                heroToUpdate.personalNote = req.body.personalNote;

                await heroRepository.persist(heroToUpdate);

                res.json(heroToUpdate);
            })
            .catch((error) => console.log(error));
    }
}
