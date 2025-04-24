import React from 'react';
import styles from './NotFoundBlock.module.scss'

function NotFoundBlock() {
    return (
        <div className="container">
            <h1 className={styles.title}>Nothing found</h1>
        </div>
    );
}

export default NotFoundBlock;