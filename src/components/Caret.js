// @flow

import React from 'react';

const CARET_WIDTH = 7.22;

const styles = {
    base: {
        display: 'flex',
        flexGrow: 1,
        marginBottom: 15,
    },
    bang: {
        width: CARET_WIDTH * 2,
    },
    inputWrapper: {
        flexGrow: 1,
    },
    blinkingCaret: {
        position: 'relative',
    },
    value: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
    },
    input: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        backgroundColor: '#ffff00',
        width: CARET_WIDTH,
        color: '#fff',
        padding: 0,
        margin: 0,
        border: 0,
        outline: 0,
    },
};

function BlinkingCaret(props: {
    blink: boolean,
    value: string,
    row: number,
    col: number,
}) {
    const isVisible = { visibility: props.blink ? 'hidden' : 'visible' };
    const caretPosition = {
        left: CARET_WIDTH * props.col,
    };
    return (
        <div style={styles.blinkingCaret}>
            <div style={styles.value}>{props.value}</div>
            <div style={{ ...styles.input, ...isVisible, ...caretPosition }}>&nbsp;</div>
        </div>
    );
}

export default class Caret extends React.Component {
    static defaultProps = {
        blinkSpeed: 750,
        value: '',
        row: 0,
        col: 0,
    };

    props: {
        blinkSpeed: number,
        value: string,
        row: number,
        col: number,
    };

    state = {
        blink: false,
    };

    componentDidMount() {
        setInterval(() => this.setState(prevState => ({ blink: !prevState.blink })), this.props.blinkSpeed);
    }

    render() {
        return (
            <div style={styles.base}>
                <div style={styles.bang}>$</div>
                <div style={styles.inputWrapper}><BlinkingCaret blink={this.state.blink} value={this.props.value} row={this.props.row} col={this.props.col} /></div>
            </div>
        );
    }
}
