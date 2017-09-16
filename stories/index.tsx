import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';
import { Button, Welcome } from '@storybook/react/demo';
import * as React from 'react';
import 'semantic-ui-css/semantic.min.css';
import HomePage from '../src/client/components/home/Home';

storiesOf('Overwatch Heroes', module).add('Home Page', () => <HomePage />);
