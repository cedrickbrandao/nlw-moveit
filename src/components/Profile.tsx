import { useContext } from 'react';
import { ChallengerContext } from '../contexts/ChallengerContext';
import style from '../styles/components/Profile.module.css';
export function Profile() {
    const { level } = useContext(ChallengerContext);
    return (
        <div className={style.profileContainer}>
            <img src="https://github.com/diego3g.png" alt="Diego" />
            <div>
                <strong>Nome do Cara</strong>
                <p><img src="icons/level.svg" alt="" />Level {level}</p>
            </div>
        </div>
    );
}