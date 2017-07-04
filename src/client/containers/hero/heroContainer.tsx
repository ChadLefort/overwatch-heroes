import * as React from 'react';
import { connect } from 'react-redux';
import { returntypeof } from 'react-redux-typescript';
import { Dispatch } from 'redux';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { actionCreators } from '../../actions/hero/heroActions';
import HeroPage from '../../components/hero/HeroPage';
import { RootState } from '../../reducers/reducers';

const mapStateToProps = (rootState: RootState) => ({
    hero: rootState.heroReducer.hero,
    loading: rootState.heroReducer.fetching,
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
    fetchHero: (id: string) => dispatch(actionCreators.fetchHero(id)),
    resetHero: () => dispatch(actionCreators.resetHero()),
    updateFavoriteHero: (id: string, isFavorite: boolean) =>
        dispatch(actionCreators.updateFavoriteHero(id, isFavorite)),
});

type ParamsProps = {
    params: Params;
};

type Params = {
    id: string;
};

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
type Props = typeof stateProps & typeof dispatchProps & ParamsProps;

class HeroContainer extends React.Component<Props, {}> {

    public componentWillMount() {
        this.props.fetchHero(this.props.params.id);
    }

    public componentWillUnmount() {
        this.props.resetHero();
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (nextProps.params.id !== this.props.params.id) {
            this.props.fetchHero(nextProps.params.id);
        }
    }

    public updateFavoriteHero = (isFavorite: boolean) => {
        return this.props.updateFavoriteHero(this.props.params.id, isFavorite);
    }

    public render() {
        const { loading, hero } = this.props;

        return (
            <HeroPage loading={loading} hero={hero} updateFavoriteHero={this.updateFavoriteHero} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroContainer);
