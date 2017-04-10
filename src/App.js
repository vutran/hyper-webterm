// @flow

import React from 'react';
import Terminal from './components/Terminal';
import echo from './extensions/echo';
import themeChooser from './extensions/theme-chooser';

interface Props { }

const styles = {
    base: {
        display: 'flex',
        alignItems: 'center',
    },
};

export default class App extends React.Component {
    state: {
        theme: string,
    };

    state = {
        theme: null,
    };

    render() {
        return (
            <div style={styles.base}>
                <Terminal
                    width={500}
                    extensions={[
                        echo,
                        themeChooser,
                    ]}
                    />
            </div>
        );
    }
}
