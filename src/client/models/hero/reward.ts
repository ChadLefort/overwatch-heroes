import { Cost, Quality, Type } from './';

export class Reward {
    public id: number;
    public name: string;
    public cost: Cost;
    public url: string;
    public type: Type;
    public quality: Quality;
    public event: Event;
}
