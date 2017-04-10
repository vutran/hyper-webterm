// @flow

import React from 'react';
import unfetch from 'unfetch';

export default class Theme extends React.Component {
    static command: string;

    props: {
        args: Array<string>,
        onAction: (body: { type: string, body: string }) => void,
    };

    applyTheme(body: string) {
        this.props.onAction({ type: 'applyTheme', body });
    }

    componentDidMount() {
        unfetch(`https://unpkg.com/${this.props.args[1]}`)
            .then(resp => {
                resp.text().then(body => {
                    this.applyTheme(body);
                });
            });
    }

    render() {
        return null;
    }
}

Theme.command = 'theme';
