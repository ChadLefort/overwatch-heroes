import { map } from 'lodash/fp';
import * as React from 'react';
import { Card, Grid, Header } from 'semantic-ui-react';
import { Ability, Hero } from '../../models/';

type Props = {
    abilities: Array<Ability>,
};

const Abilities = (props: Props) => {
    const { abilities } = props;
    const items = map((ability: Ability) => {
        return { header: ability.name, description: ability.description };
    }, abilities);

    return (
        <Grid.Row>
            <Grid.Column>
                <Header as="h3">Abilities</Header>
                <Card.Group items={items} itemsPerRow={3} stackable={true} />
            </Grid.Column>
        </Grid.Row>
    );
};

export default Abilities;
