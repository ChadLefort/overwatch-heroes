import { AxiosResponse } from 'axios';
import * as _ from 'lodash';
import * as React from 'react';
import { Button, Form, Grid, Header, TextArea } from 'semantic-ui-react';
import { Hero } from '../../../models/hero';
import PersonalNoteForm from './PersonalNoteForm';
import { PersonalNoteForm as FormData } from './types';

type Props = {
    hero: Hero,
    updateHero: (hero: Hero) => Promise<AxiosResponse>
};

type State = {
    isEditing: boolean
};

export default class PersonalNote extends React.Component<Props, {}> {
    public state: State;

    public constructor() {
        super();
        this.state = { isEditing: false };
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (nextProps.hero.id !== this.props.hero.id) {
            this.setState({ isEditing: false });
        }
    }

    public onSubmit = async (values: FormData) => {
        await this.props.updateHero({ ...this.props.hero, personalNote: values.personalNote });
        this.setState({ isEditing: false });
    }

    public toggleEdit = () => {
        this.setState({ isEditing: !this.state.isEditing });
    }

    public render() {
        const { personalNote } = this.props.hero;
        const buttonText = _.isNil(personalNote) ? 'Add' : 'Edit';

        if (this.state.isEditing) {
            return (
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h3">Personal Note</Header>
                            <PersonalNoteForm personalNote={personalNote} onSubmit={this.onSubmit} toggleEdit={this.toggleEdit} />
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
                    {personalNote &&
                        <Grid.Row>
                            <Grid.Column>
                                <p>{personalNote}</p>
                            </Grid.Column>
                        </Grid.Row>
                    }
                </Grid>
            );
        }
    }
}
