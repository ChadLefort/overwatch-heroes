import { map } from 'lodash/fp';
import * as React from 'react';
import { Link } from 'react-router';
import { Icon, Menu } from 'semantic-ui-react';
import { Hero, Heros } from '../../models/';

type Props = {
    heros: Array<Hero>,
};

const HerosMenu = (props: Props) => {
    const { heros } = props;
    const mappedHeros = map((hero: Hero) =>
        (
            <Menu.Item link={true} key={hero.id} as={Link} to={`/heros/${hero.id}`}>
                {hero.isFavorite && <Icon name="favorite" />} {hero.name}
            </Menu.Item>
        ), heros);

    return (
        <Menu vertical={true} fluid={true}>
            {mappedHeros}
        </Menu>
    );
};

export default HerosMenu;
