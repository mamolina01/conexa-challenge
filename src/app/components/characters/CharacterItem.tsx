import Image from 'next/image'
import styles from './CharacterItem.module.scss'

interface Props {
    character: any
}

export const CharacterItem = ({ character }: Props) => {

    const getStatusClass = () => {
        console.log(character.status)
        switch (character.status.toLowerCase()) {
            case 'alive':
                return styles.alive
            case 'dead':
                return styles.dead
        }
    }

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={character.image}
                    alt={character.name}
                    className={styles.image}
                    fill
                />
                <span className={`${styles.status} ${getStatusClass()}`}>
                    {character.status}
                </span>
            </div>
            <p className={styles.name}>{character.name}</p>
        </div >
    )
}
