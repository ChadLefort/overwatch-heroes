import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Hero } from '../../../models/hero';
import Abilities from './abilities';
import Biography from './biography';
import HeaderRow from './header-row';
import PersonalNote from './personal-note';
import Stats from './stats';

type Props = {
    loading: boolean;
    hero: Hero;
    updateFavoriteHero: (isFavorite: boolean) => Promise<void>,
};

export default class HeroPage extends React.Component<Props, {}> {

    public render() {
        const { hero, loading } = this.props;

        return (
            <Segment loading={loading} basic={true}>
                <HeaderRow hero={hero} updateFavoriteHero={this.props.updateFavoriteHero} />
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <p>{hero.description}</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Biography hero={hero} />
                    <Stats hero={hero} />
                    <Abilities abilities={hero.abilities} />
                    <PersonalNote id={hero.id} />
                </Grid>
            </Segment>
        );
    }
}
