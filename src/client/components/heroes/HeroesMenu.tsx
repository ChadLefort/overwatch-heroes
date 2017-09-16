import { map } from 'lodash/fp';
import * as React from 'react';
import { Link } from 'react-router';
import { Icon, Menu } from 'semantic-ui-react';
import { Hero, Heroes } from '../../models/';

type Props = {
  heroes: Array<Hero>;
};

const HeroesMenu = (props: Props) => {
  const { heroes } = props;
  const mappedHeroes = map(
    (hero: Hero) => (
      <Menu.Item link={true} key={hero.id} as={Link} to={`/heroes/${hero.id}`}>
        {hero.isFavorite && <Icon name="favorite" />} {hero.name}
      </Menu.Item>
    ),
    heroes
  );

  return (
    <Menu vertical={true} fluid={true}>
      {mappedHeroes}
    </Menu>
  );
};

export default HeroesMenu;
