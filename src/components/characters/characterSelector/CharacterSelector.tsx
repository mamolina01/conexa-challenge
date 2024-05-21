import { LuPointer } from 'react-icons/lu'
import styles from './CharacterSelector.module.scss'

interface Props {
    handleSelector: (selector: number) => void
    selectorActive: number
}

export const CharacterSelector = ({ handleSelector, selectorActive }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.characterContainer}>
                <p className={`${styles.text} ${styles.characterOne}`}>Character #1</p>
                <button onClick={() => handleSelector(1)} className={`${styles.button} ${styles.characterOne} ${selectorActive === 1 ? styles.active : ''}`}>
                    <LuPointer />
                    <span>Choose one...</span>
                </button>
            </div>
            <div className={styles.characterContainer}>
                <button onClick={() => handleSelector(2)} className={`${styles.button} ${styles.characterTwo} ${selectorActive === 2 ? styles.active : ''}`}>
                    <LuPointer />
                    <span>Choose one...</span>
                </button>
                <p className={`${styles.text} ${styles.characterTwo}`}>Character #2</p>
            </div>
        </div>
    )
}
