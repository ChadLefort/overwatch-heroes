import { AxiosResponse } from 'axios';
import { isNil } from 'lodash/fp';
import * as React from 'react';
import { Button, Grid, Header, Icon, Image } from 'semantic-ui-react';
import { Hero } from '../../models/hero';
import FavoriteHero from './FavoriteHero';

type Props = {
  hero: Hero;
  updateHero: (hero: Hero) => Promise<AxiosResponse>;
};

const HeaderRow = (props: Props) => {
  const { hero } = props;
  let image: JSX.Element;

  if (!isNil(hero.id)) {
    image = <Image shape="rounded" src={require(`../../../assets/heroes/${hero.id}.png`)} />;
  }

  return (
    <Grid.Row>
      <Grid.Column width={8} textAlign="left">
        <Header as="h1">
          {image} {hero.name}
        </Header>
      </Grid.Column>
      <Grid.Column width={8} textAlign="right">
        <FavoriteHero hero={hero} updateHero={props.updateHero} />
      </Grid.Column>
    </Grid.Row>
  );
};

export default HeaderRow;
