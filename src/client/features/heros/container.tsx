import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { returntypeof } from 'react-redux-typescript';
import { Container, Grid, Menu, Segment } from 'semantic-ui-react';
import HerosMenu from '../../components/heros/heros-menu';
import { RootState } from '../../config/reducers';
import { actionCreators } from './actions';

const mapStateToProps = (rootState: RootState, ownProps) => ({
    heros: rootState.herosReducer.heros,
    location: ownProps.location,
});

const dispatchToProps = {
    fetchHeros: actionCreators.fetchHeros,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

class Heros extends React.Component<Props, {}> {

    public componentWillMount() {
        if (_.isEmpty(this.props.heros)) {
            this.props.fetchHeros();
        }
    }

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
                            {this.props.location.pathname === '/heros' ? <p> Click on the heros to learn more </p> : null}
                            {this.props.children}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default connect(mapStateToProps, dispatchToProps)(Heros);
