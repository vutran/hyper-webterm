// @flow

import React from 'react';
import Terminal from './components/Terminal';

interface Props { }

const styles = {
    base: {
        display: 'flex',
        alignItems: 'center',
    },
};

export default class App extends React.Component {
    render() {
        return (
            <div style={styles.base}>
                <Terminal width={500} />
            </div>
        );
    }
}
