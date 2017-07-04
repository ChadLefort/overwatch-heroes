import * as React from 'react';
import { Grid, Header, List } from 'semantic-ui-react';
import { Hero } from '../../models/hero';

type Props = {
    hero: Hero;
};

const Stats = (props: Props) => {
    const { hero } = props;

    return (
        <Grid.Row>
            <Grid.Column>
                <Header as="h3">Stats</Header>
                <List>
                    <List.Item>
                        <List.Content>Health: {hero.health}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>Armour: {hero.armour}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>Shield: {hero.shield} </List.Content>
                    </List.Item>
                </List>
            </Grid.Column>
        </Grid.Row>
    );
};

export default Stats;
