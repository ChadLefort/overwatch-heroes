import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hero {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public isFavorite: boolean;

    @Column({ length: 500, default: null })
    public personalNote: string;
}
