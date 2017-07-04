import { Ability } from './ability';
import { Reward } from './reward';
import { Role } from './role';

export { Ability } from './ability';
export { Cost } from './cost';
export { Event } from './event';
export { Quality } from './quality';
export { Reward } from './reward';
export { Role } from './role';
export { Type } from './type';

export class Hero {
    public id: number;
    public name: string;
    public description: string;
    public health: number;
    public armour: number;
    public shield: number;
    public real_name: string;
    public age: number;
    public height: any;
    public affiliation: string;
    public base_of_operations: string;
    public difficulty: number;
    public url: string;
    public role: Role;
    public sub_roles: Array<any>;
    public abilities: Array<Ability>;
    public rewards: Array<Reward>;
    public isFavorite: boolean;
    public personalNote: string;
}
