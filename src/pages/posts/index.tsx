import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>09 de Abril de 2021</time>
                        <strong>Creating a Bla repo with ABCD</strong>
                        <p>In this guide, you will learn how to create a Bla repo to manage multiples ABC</p>
                    </a>

                    <a href="#">
                        <time>09 de Abril de 2021</time>
                        <strong>Creating a Bla repo with ABCD</strong>
                        <p>In this guide, you will learn how to create a Bla repo to manage multiples ABC</p>
                    </a>

                    <a href="#">
                        <time>09 de Abril de 2021</time>
                        <strong>Creating a Bla repo with ABCD</strong>
                        <p>In this guide, you will learn how to create a Bla repo to manage multiples ABC</p>
                    </a>

                    <a href="#">
                        <time>09 de Abril de 2021</time>
                        <strong>Creating a Bla repo with ABCD</strong>
                        <p>In this guide, you will learn how to create a Bla repo to manage multiples ABC</p>
                    </a>
                </div>
            </main>
        </>
    )
}