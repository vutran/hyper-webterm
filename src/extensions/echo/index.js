// @flow

import React from 'react';

export default class Echo extends React.Component {
    props: {
        args: Array<string>,
    };

    render() {
        return <div>{this.props.args.slice(1).join(' ')}</div>;
    }
}
