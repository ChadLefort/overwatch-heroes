import * as React from 'react';
import { connect } from 'react-redux';
import { returntypeof } from 'react-redux-typescript';
import { Grid, Segment } from 'semantic-ui-react';
import HeroesMenu from '../components/heroes/HeroesMenu';
import { RootState } from '../reducers/reducers';

const mapStateToProps = (rootState: RootState, ownProps) => ({
  heroes: rootState.heroesReducer.heroes,
  location: ownProps.location
});

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps;

class Heroes extends React.Component<Props, {}> {
  public render() {
    const { heroes } = this.props;

    return (
      <Grid stackable={true}>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={3}>
            <HeroesMenu heroes={heroes} />
          </Grid.Column>
          <Grid.Column width={13}>
            <Segment>
              {this.props.location.pathname === '/heroes' && <p> Click on the heroes to learn more </p>}
              {this.props.children}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, {})(Heroes);
