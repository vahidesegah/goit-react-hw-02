import styles from './Notification.module.css';

function Notification({ message }) {
    return (
        <div className={styles.notification}>
            <p>{message}</p>
        </div>
    );
}

export default Notification; 