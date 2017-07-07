import * as _ from 'lodash';
import * as React from 'react';
import { Link } from 'react-router';
import { Icon, Menu } from 'semantic-ui-react';
import { Hero, Heros } from '../../models/';

type Props = {
    heros: Array<Hero>,
};

const HerosMenu = (props: Props) => {
    const { heros } = props;
    const mappedHeros = _.map(heros, (hero: Hero, key: number) =>
        (
            <Menu.Item link={true} key={key} as={Link} to={`/heros/${hero.id}`}>
                {hero.isFavorite && <Icon name="favorite" />} {hero.name}
            </Menu.Item>
        )
    );

    return (
        <Menu vertical={true} fluid={true}>
            {mappedHeros}
        </Menu>
    );
};

export default HerosMenu;
