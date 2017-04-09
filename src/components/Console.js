// @flow

import React from 'react';

interface Props {
    history: Array<string>,
}

const styles = {
    base: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
};

export default function Console(props: Props) {
    return (
        <div style={styles.base}>
            {props.history.map((input, key) => <div key={key}>$ {input}</div>)}
        </div>
    );
}
