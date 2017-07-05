import * as _ from 'lodash';
import * as React from 'react';
import { Button, Form, Grid, Header, TextArea } from 'semantic-ui-react';
import { Hero } from '../../models/hero';

type Props = {
    hero: Hero;
};

type State = {
    isEditing: boolean
};

export default class PersonalNote extends React.Component<Props, {}> {
    public state: State;

    public constructor() {
        super();
        this.state = {
            isEditing: false,
        };
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (nextProps.hero.id !== this.props.hero.id) {
            this.setState({ isEditing: false });
        }
    }

    public toggleEdit = () => {
        this.setState({ isEditing: !this.state.isEditing });
    }

    public render() {
        let { personalNote } = this.props.hero;
        personalNote = _.isNull(personalNote) ? undefined : personalNote;
        const buttonText = _.isUndefined(personalNote) ? 'Add' : 'Edit';

        if (this.state.isEditing) {
            return (
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h3">Personal Note</Header>
                            <Form>
                                <Form.Field control={TextArea} placeholder="Leave some personal notes about this hero" value={personalNote} />
                                <Button>Submit</Button>
                                <Button onClick={this.toggleEdit} type="button">Cancel</Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            );
        } else {
            return (
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8} textAlign="left">
                            <Header as="h3">Personal Note</Header>
                        </Grid.Column>
                        <Grid.Column width={8} textAlign="right">
                            <Button onClick={this.toggleEdit}>{buttonText} Personal Note</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            {!_.isUndefined(personalNote) && <p>{personalNote}</p>}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            );
        }
    }
}
