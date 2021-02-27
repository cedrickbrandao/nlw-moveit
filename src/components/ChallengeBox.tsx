import { useContext } from 'react';
import { ChallengerContext } from '../contexts/ChallengerContext';
import { CountDownContext } from '../contexts/CountDownContext';
import style from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

    const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengerContext);
    const { resetCountDown } = useContext(CountDownContext);

    function onResetChallenge() {
        resetChallenge();
        resetCountDown();
    }

    function onCompletedChallenge() {
        completedChallenge();
        resetCountDown();
    }

    return (
        <div className={style.container}>
            {activeChallenge ? (
                <div className={style.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="" />
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button type="button" className={style.buttonFailedChallenge} onClick={onResetChallenge}>Falhei</button>
                        <button type="button" className={style.buttonSuccessChallenge} onClick={onCompletedChallenge}>Completei</button>
                    </footer>
                </div>
            ) :
                (
                    <div className={style.challengeNotActive}>
                        <strong>Finalize um ciclo para receber um desafio.</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                            Avance de level completando desafios.
                        </p>
                    </div>
                )}
        </div>
    );
}