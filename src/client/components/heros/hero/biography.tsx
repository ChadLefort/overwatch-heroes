import * as React from 'react';
import { Grid, Header, List } from 'semantic-ui-react';
import { Hero } from '../../../models/hero';

type Props = {
    hero: Hero;
};

const Biography = (props: Props) => {
    const { hero } = props;

    return (
        <Grid.Row>
            <Grid.Column>
                <Header as="h3">Biography</Header>
                <List>
                    <List.Item>
                        <List.Icon name="user" />
                        <List.Content>Real Name: {hero.real_name}, Age: {hero.age}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="globe" />
                        <List.Content>Base of Operations: {hero.base_of_operations !== null ? hero.base_of_operations : 'None'}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name="star" />
                        <List.Content>Affiliation: {hero.affiliation !== null ? hero.affiliation : 'None'} </List.Content>
                    </List.Item>
                </List>
            </Grid.Column>
        </Grid.Row>
    );
};

export default Biography;
