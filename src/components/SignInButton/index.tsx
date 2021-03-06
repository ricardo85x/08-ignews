import { FaGithub } from 'react-icons/fa'; // font awesome
import { FiX } from 'react-icons/fi' // feather icons 
import { signIn, signOut, useSession } from 'next-auth/client'


import styles from './styles.module.scss';

export function SignInButton() {

    const [session] = useSession();

    return session ? (
        <button 
            className={styles.signInButton}
            type="button"
            onClick={() => signOut()}
        >
            <FaGithub  color="#04d361"/>
            {session.user.name}
            <FiX className={styles.closeIcon} color="#737380" />
        </button>
    ) : (
        <button 
            className={styles.signInButton}
            type="button"
            onClick={() => signIn('github')}
        >
            <FaGithub  color="#eba417"/>
            Sign in with GitHub
        </button>
    )
}