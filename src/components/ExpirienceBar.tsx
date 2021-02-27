import { useContext } from 'react';
import { ChallengerContext } from '../contexts/ChallengerContext';
import style from '../styles/components/ExperienceBar.module.css';

export default function ExperienceBar() {

    const { currentExperience, experienceToNextLevel } = useContext(ChallengerContext);
    const percetToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

    return (
        <header className={style.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percetToNextLevel}%` }}>
                    <span className={style.currentExperience} style={{ left: `${percetToNextLevel}%` }}>{currentExperience} xp</span>
                </div>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}