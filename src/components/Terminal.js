// @flow

import React from 'react';
import minimist from 'minimist';
import config from '../config';
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

export default class Terminal extends React.Component {
    static defaultProps = {
        width: 500,
        height: 400,
    };

    state: {
        config: any;
        history: Array<[string, string]>,
        input: string,
        decorateConfig?: any;
    };

    state = {
        // loaded configuration
        config: {},
        // input history
        history: [],
        // current caret input
        input: '',
        // current caret row
        row: 0,
        // current caret column
        col: 0,
        // optional user-decorated config
        decorateConfig: null,
    };

    handleAction = (message: any) => {
        switch (message.type) {
            case 'applyTheme':
                {
                    const config = eval(message.body);
                    // TODO: pass current config
                    this.setState({ decorateConfig: config({}) });
                }
                break;
        }
    }

    handleKeyDown = (e: KeyboardEvent) => {
        const key = e.key;
        const ctrlKey = e.ctrlKey;

        console.debug('KeyboadEvent:', e);

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
                return <Ext args={parts} onAction={this.handleAction} />;
            }
        }

        return <div>command not found: {parts[0]}</div>;
    }

    writeLine(text: string) {
        this.setState(prevState => ({ history: [...prevState.history, ['', text]] }));
    }

    updateConfig(newConfig: any) {
        this.setState({ config: newConfig });
    }

    getDecoratedConfig() {
        return Object.assign({}, this.state.config, this.state.decorateConfig);
    }

    componentDidMount() {
        this.updateConfig(config);
        document.addEventListener('keydown', this.handleKeyDown);
    }

    render() {
        const decoratedConfig = this.getDecoratedConfig();

        const styles = {
            base: {
                display: 'flex',
                flexDirection: 'column',
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 4,
                borderColor: decoratedConfig.borderColor,
                fontSize: decoratedConfig.fontSize,
                fontFamily: decoratedConfig.fontFamily,
                fontSmoothingOverride: 'antialiased',
                backgroundColor: decoratedConfig.backgroundColor,
                color: decoratedConfig.foregroundColor,
                padding: decoratedConfig.padding,
            },
        };

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
