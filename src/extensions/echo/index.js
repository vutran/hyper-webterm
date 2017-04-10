// @flow

import React from 'react';

export default class Echo extends React.Component {
    static command: string;

    props: {
        args: Array<string>,
    };

    render() {
        return <div>{this.props.args.slice(1).join(' ')}</div>;
    }
}

Echo.command = 'echo';
