import { Request, Response } from 'express';
import { Body, Controller, Get, Post, Req, Res, UrlParam } from 'giuseppe';
import { connection } from '../';
import { Hero } from '../models/hero';

@Controller('heros')
export class HerosController {

    @Get('create')
    public create( @Req() req: Request, @Res() res: Response): void {
        connection
            .then(async (connection) => {

                for (let i = 1; i <= 24; i++) {
                    const hero = new Hero();
                    hero.isFavorite = false;

                    await connection.manager.persist(hero);
                }
            })
            .catch((error) => console.log(error));

        res.sendStatus(200);
    }

    @Get()
    public favorites( @Req() req: Request, @Res() res: Response): void {
        connection
            .then(async (connection) => res.json(await connection.manager.find(Hero)))
            .catch((error) => console.log(error));
    }

    @Get(':id')
    public favoritesById( @UrlParam('id') id: number, @Req() req: Request, @Res() res: Response): void {
        connection
            .then(async (connection) => res.json(await connection.manager.findOneById(Hero, id)))
            .catch((error) => console.log(error));
    }

    @Post(':id')
    public updateFavorites( @UrlParam('id') id: number, @Req() req: Request, @Res() res: Response): void {
        connection
            .then(async (connection) => {
                const heroToUpdate = await connection.manager.findOneById(Hero, id);
                heroToUpdate.isFavorite = req.body.isFavorite;
                heroToUpdate.personalNote = req.body.personalNote;

                await connection.manager.persist(heroToUpdate, id);

                res.json(heroToUpdate);
            })
            .catch((error) => console.log(error));
    }
}
