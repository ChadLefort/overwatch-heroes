import { AxiosResponse } from 'axios';
import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Hero } from '../../models';

type Props = {
    hero: Hero;
    updateHero: (hero: Hero) => Promise<AxiosResponse>,
};

type State = {
    favorite: boolean
};

export default class FavoriteHero extends React.Component<Props, any> {
    public state: State;

    public constructor() {
        super();
        this.state = {
            favorite: false,
        };
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (nextProps.hero.isFavorite !== this.props.hero.isFavorite) {
            this.setState({ favorite: nextProps.hero.isFavorite });
        }
    }

    public toggleFavoriteHero = async () => {
        const response = await this.props.updateHero({ ...this.props.hero, isFavorite: !this.state.favorite });
        const hero: Hero = response.data;
        this.setState({ favorite: hero.isFavorite });
    }

    public render() {
        return (
            <Button icon={true} positive={!this.state.favorite} negative={this.state.favorite} onClick={this.toggleFavoriteHero}>
                {this.state.favorite ? <span><Icon name="minus" />Un-favorite Hero</span> : <span><Icon name="favorite" />Favorite Hero</span>}
            </Button>
        );
    }
}
