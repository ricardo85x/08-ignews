import { FaGithub } from 'react-icons/fa'; // font awesome
import { FiX } from 'react-icons/fi' // feather icons 

import styles from './styles.module.scss';

export function SignInButton() {

    const isUserLoggedIn = true;

    return isUserLoggedIn ? (
        <button 
            className={styles.signInButton}
            type="button"
        >
            <FaGithub  color="#04d361"/>
            Ricardo Ferreira
            <FiX className={styles.closeIcon} color="#737380" />
        </button>
    ) : (
        <button 
            className={styles.signInButton}
            type="button"
        >
            <FaGithub  color="#eba417"/>
            Sign in with GitHub
        </button>
    )
}