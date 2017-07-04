import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';

type Props = {
    isFavorite: boolean;
    updateFavoriteHero: (isFavorite: boolean) => Promise<void>,
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
        if (nextProps.isFavorite !== this.props.isFavorite) {
            this.setState({ favorite: nextProps.isFavorite});
        }
    }

    public toggleFavoriteHero = async () => {
        const response: any = await this.props.updateFavoriteHero(!this.state.favorite);
        this.setState({ favorite: response.data.isFavorite });
    }

    public render() {
        return (
            <Button icon={true} positive={!this.state.favorite} negative={this.state.favorite} onClick={this.toggleFavoriteHero}>
                {this.state.favorite ? <span><Icon name="minus"/>Un-favorite Hero</span> : <span><Icon name="favorite"/>Favorite Hero</span>}
            </Button>
        );
    }
}
