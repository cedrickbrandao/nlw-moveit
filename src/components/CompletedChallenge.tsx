import { useContext } from 'react';
import { ChallengerContext } from '../contexts/ChallengerContext';
import style from '../styles/components/CompletedChallenge.module.css'

export function CompletedChallenge() {
    const { challengesCompleted } = useContext(ChallengerContext);
    return (
        <div className={style.container}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );

}