import * as React from 'react';
import { Container } from 'semantic-ui-react';
import '../../styles/_main.scss';
import Header from './header';

class Layout extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <Container>
                    <Header />
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

export default Layout;
