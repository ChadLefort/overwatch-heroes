import * as React from 'react';
import { connect } from 'react-redux';
import { returntypeof } from 'react-redux-typescript';
import { Grid, Segment } from 'semantic-ui-react';
import HerosMenu from '../../components/heros/HerosMenu';
import { RootState } from '../../reducers/reducers';

const mapStateToProps = (rootState: RootState, ownProps) => ({
    heros: rootState.herosReducer.heros,
    location: ownProps.location,
});

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps;

class Heros extends React.Component<Props, {}> {

    public render() {
        const { heros } = this.props;

        return (
            <Grid stackable={true}>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={8} computer={3}>
                        <HerosMenu heros={heros} />
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Segment>
                            {this.props.location.pathname === '/heros' && <p> Click on the heros to learn more </p>}
                            {this.props.children}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default connect(mapStateToProps, {})(Heros);
