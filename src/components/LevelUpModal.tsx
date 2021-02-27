import { useContext } from 'react';
import { ChallengerContext } from '../contexts/ChallengerContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {

    const { level, setLevelUpModalOpen } = useContext(ChallengerContext);

    return (

        <div className={styles.overlay}>

            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns!</strong>
                <p>Você alcançou um novo nível</p>

                <button type="button" onClick={() => setLevelUpModalOpen(false)}>
                    <img src="/icons/close.svg" alt="Fechar modal" />
                </button>
            </div>

        </div>
    );
}