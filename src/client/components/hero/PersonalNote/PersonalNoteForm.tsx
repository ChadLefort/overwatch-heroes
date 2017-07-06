import { AxiosResponse } from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { Field, FormProps, reduxForm } from 'redux-form';
import { Button, Form, TextArea } from 'semantic-ui-react';
import { required } from '../../../config/validation';
import { Hero } from '../../../models/hero';
import { RootState } from '../../../reducers/reducers';
import SemanticFormField from '../../common/SemanticFormField';
import { FormState, PersonalNoteForm as FormData } from './types';

type OwnProps = {
    personalNote: string,
    onSubmit: (values: FormData) => void,
    toggleEdit: () => void
};

type Props = FormProps<FormData, any, FormState> & OwnProps;

let PersonalNoteForm = (props: Props) => {
    const { handleSubmit, personalNote, onSubmit, toggleEdit } = props;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Field name="personalNote" component={SemanticFormField} as={TextArea} placeholder="Leave some personal notes about this hero" validate={required} />
            <Button primary={true} loading={props.submitting} disabled={props.pristine || props.submitting}>Submit</Button>
            <Button onClick={toggleEdit} type="button">Cancel</Button>
        </Form>
    );
};

PersonalNoteForm = reduxForm({ form: 'personalNote' })(PersonalNoteForm);

export default connect((state: RootState) => ({ initialValues: { personalNote: state.heroReducer.hero.personalNote} }))(PersonalNoteForm);
