import { AxiosResponse } from 'axios';
import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Hero } from '../../models/hero';
import Abilities from './abilities';
import Biography from './biography';
import HeaderRow from './HeaderRow';
import PersonalNote from './PersonalNote';
import Stats from './stats';

type Props = {
    loading: boolean;
    hero: Hero;
    updateHero: (hero: Hero) => Promise<AxiosResponse>,
};

export default class HeroPage extends React.Component<Props, {}> {

    public render() {
        const { hero, loading } = this.props;

        return (
            <Segment loading={loading} basic={true}>
                <Grid>
                    <HeaderRow hero={hero} updateHero={this.props.updateHero} />
                    <Grid.Row>
                        <Grid.Column>
                            <p>{hero.description}</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Biography hero={hero} />
                    <Stats hero={hero} />
                    <Abilities abilities={hero.abilities} />
                </Grid>
                <PersonalNote hero={hero} updateHero={this.props.updateHero} />
            </Segment>
        );
    }
}
