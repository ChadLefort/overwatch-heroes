import { FormStateMap } from 'redux-form';

export type PersonalNoteForm = {
    personalNote: string,
};

export type FormState = {
    form: FormStateMap,
    personalNoteForm?: PersonalNoteForm,
};
