import styles from './Blockquote.module.scss';

const Blockquote = ({ content }) => {
    return (
        <div className={`${styles['blockquote-wrapper']}`}>
            <blockquote className={styles['blockquote']}>
                <h3>{content}</h3>
            </blockquote>
        </div>
    );
};

export default Blockquote;
