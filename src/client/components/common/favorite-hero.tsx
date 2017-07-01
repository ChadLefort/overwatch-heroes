import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';

type State = {
    favorite: boolean
};

export default class FavoriteHero extends React.Component<any, any> {
    public state: State;

    public constructor() {
        super();
        this.state = {
            favorite: false,
        };
    }

    public toggleFavoriteHero = () => {
        if (this.state.favorite) {
            this.setState({ favorite: false });
        } else {
            this.setState({ favorite: true });
        }
    }

    public render() {
        return (
            <Button icon={true} positive={!this.state.favorite} negative={this.state.favorite} onClick={this.toggleFavoriteHero}>
                {this.state.favorite ? <span><Icon name="minus"/>Un-favorite Hero</span> : <span><Icon name="favorite"/>Favorite Hero</span>}
            </Button>
        );
    }
}
