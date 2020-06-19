import React from 'react';
import styles from './header.scss';
import { hot } from 'react-hot-loader/root';

const HeaderComponent = () => {
    return (
        <header>
            <h1 className={styles.example}>Hello, World!</h1>
        </header>
    );
}

export const Header = hot(HeaderComponent);