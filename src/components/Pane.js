// @flow

import React from 'react';

interface Props {
    children?: React.Element<any>,
}

const styles = {
    base: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
};

export default function Pane(props: Props) {
    return (
        <div style={styles.base}>
            {props.children}
        </div>
    );
}
