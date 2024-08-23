import styles from './Spinner.module.scss'

export const Spinner = () => {
    return (
        <div className={styles.container} data-testid="spinner">
            <div className={styles.spinner} />
        </div>
    )
}
