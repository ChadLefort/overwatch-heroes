import * as React from 'react';
import { Button, Form, Grid, Header, TextArea } from 'semantic-ui-react';

type Props = {
    id: number;
};

const PersonalNote = (props: Props) => {
    return (
        <Grid.Row>
            <Grid.Column>
                <Header as="h3">Personal Notes</Header>
                <Form>
                    <Form.Field control={TextArea} placeholder="Leave some personal notes about this hero" />
                    <Form.Field control={Button}>Submit</Form.Field>
                </Form>
            </Grid.Column>
        </Grid.Row>
    );
};

export default PersonalNote;
