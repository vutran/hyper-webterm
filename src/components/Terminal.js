// @flow

import React from 'react';
import minimist from 'minimist';
import { pascalize } from '../utils';
import Header from './Header';
import Pane from './Pane';
import Console from './Console';
import Caret from './Caret';

interface Props {
    // window size
    width?: number,
    // window height
    height?: number,
    // list of extensions/commands
    extensions: Array<any>;
    children?: React.Element<any>,
}

const styles = {
    base: {
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        borderColor: '#333',
        fontSize: 12,
        fontFamily: 'Menlo, "DejaVu Sans Mono", "Lucida Console", monospace',
        fontSmoothingOverride: 'antialiased',
        backgroundColor: '#000',
        color: '#fff',
        padding: '12px 14px',
    },
};

export default class Terminal extends React.Component {
    static defaultProps = {
        width: 500,
        height: 400,
    };

    state: {
        history: Array<[string, string]>,
        input: string,
    };

    state = {
        // input history
        history: [],
        // current caret input
        input: '',
        // current caret row
        row: 0,
        // current caret column
        col: 0,
    };

    handleKeyDown = (e: KeyboardEvent) => {
        const key = e.key;
        const ctrlKey = e.ctrlKey;

        console.log(e);

        if (key.toLowerCase() === 'l' && ctrlKey) {
            this.clear();
            return;
        }

        switch (key) {
            case 'Backspace':
                this.backspace();
                break;
            case 'Enter':
                this.enter();
                break;
            case 'Control':
            case 'CapsLock':
            case 'Shift':
            case 'Alt':
            case 'Meta':
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                // TODO
                break;
            case 'Tab':
            case 'Space':
            default:
                if (key.length === 1) {
                    this.updateInput(key);
                }
                break;
        }
    }

    clear() {
        this.setState(prevState => ({ history: [], input: '' }), this.updateCaretPosition);
    }

    updateCaretPosition() {
        this.setState(prevState => ({ col: prevState.input.length }));
    }

    updateInput(key: string) {
        this.setState(prevState => ({ input: prevState.input ? prevState.input + key : key }), this.updateCaretPosition);
    }

    backspace() {
        this.setState(prevState => ({ input: prevState.input.substr(0, prevState.input.length - 1) }), this.updateCaretPosition);
    }

    enter() {
        this.setState(prevState => {
            const output = this.run(this.state.input);
            return {
                history: [
                    ...prevState.history,
                    ['$', prevState.input],
                    ['', output],
                ],
                input: '',
            };
        }, this.updateCaretPosition);
    }

    run(input: string) {
        // mock `process.argv`
        const args = minimist([ __dirname, __filename, ...input.split(' ')]);
        const parts = args._.slice(2);
        const cmd = pascalize(parts[0]);

        for (let i = 0; i < this.props.extensions.length; i++) {
            const Ext = this.props.extensions[i];
            if (Ext.name === cmd) {
                return <Ext args={parts} />;
            }
        }

        return <div>command not found: {parts[0]}</div>;
    }

    writeLine(text: string) {
        this.setState(prevState => ({ history: [...prevState.history, ['', text]] }));
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    render() {
        const size = {
            width: this.props.width,
            height: this.props.height,
        };

        return (
            <div style={{ ...styles.base, ...size }}>
                <Header>bash</Header>
                <Pane>
                    <Console history={this.state.history} />
                    <Caret value={this.state.input} row={this.state.row} col={this.state.col} />
                </Pane>
            </div>
        );
    }
}
