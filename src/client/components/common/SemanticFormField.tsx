import { isNil } from 'lodash/fp';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Form, Input, Message, TextArea } from 'semantic-ui-react';
import { FormState } from '../hero/PersonalNote/types';

type OwnProps = {
    as: any,
    placeholder: string,
};

type Props = WrappedFieldProps<FormState> & OwnProps;

const SemanticFormField = (props: Props) => {
    const As = isNil(props.as) ? props.as : Input;

    return (
        <Form.Field>
            <As {...props.input} placeholder={props.placeholder} />
            {props.meta.touched && props.meta.error && <Message negative={true} content={props.meta.error} />}
        </Form.Field>
    );
};

export default SemanticFormField;
