import * as React from 'react';
import { connect } from 'react-redux';
import { returntypeof } from 'react-redux-typescript';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import Hero from '../../../components/heros/hero';
import { RootState } from '../../../config/reducers';
import { actionCreators } from './actions';

const mapStateToProps = (rootState: RootState) => ({
    hero: rootState.heroReducer.hero,
    loading: rootState.heroReducer.fetching,
});

const dispatchToProps = {
    fetchHero: actionCreators.fetchHero,
    resetHero: actionCreators.resetHero,
};

type ParamsProps = {
    params: Params;
};

type Params = {
    id: number;
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps & ParamsProps;

class HeroContainer extends React.Component<Props, {}> {

    public componentWillMount() {
        this.props.fetchHero(this.props.params.id);
    }

    public componentWillUnmount() {
        this.props.resetHero();
    }

    public componentWillReceiveProps(nextProps) {
        if (nextProps.params.id !== this.props.params.id) {
            this.props.fetchHero(nextProps.params.id);
        }
    }

    public render() {
        const { loading, hero } = this.props;

        return (
            <Hero loading={loading} hero={hero} />
        );
    }
}

export default connect(mapStateToProps, dispatchToProps)(HeroContainer);
