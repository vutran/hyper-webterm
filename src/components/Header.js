// @flow

import React from 'react';

interface Props {
    children?: React.Element<any>,
}

const styles = {
    base: {
        display: 'flex',
        paddingBottom: 12,
    },
    menu: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        flexGrow: 1,
        height: 20,
        lineHeight: '20px',
        textAlign: 'center',
    },
    btn: {
        width: 11,
        height: 11,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: '50%',
        textIndent: -9999,
        padding: 0,
        marginRight: 6,
    },
    close: {
        backgroundColor: '#ff5c5c',
        borderColor: '#e33e41',
    },
    minimize: {
        backgroundColor: '#ffbd4c',
        borderColor: '#e09e3e',
    },
    zoom: {
        backgroundColor: '#00ca56',
        borderColor: '#14ae46',
    },
};

export default function Header(props: Props) {
    return (
        <div style={styles.base}>
            <div style={styles.menu}>
                <button style={{ ...styles.btn, ...styles.close }}>Close</button>
                <button style={{ ...styles.btn, ...styles.minimize}}>Minimize</button>
                <button style={{ ...styles.btn, ...styles.zoom }}>Zoom</button>
            </div>
            <div style={styles.title}>
                {props.children}
            </div>
        </div>
    );
}
