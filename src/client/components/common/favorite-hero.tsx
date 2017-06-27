import * as React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const FavoriteHero = () => {
    return (
        <Button icon={true}>
            <Icon name="favorite" /> <span>Favorite Hero</span>
        </Button>
    );
};

export default FavoriteHero;
