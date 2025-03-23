import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/">
          <a className={styles.logo}>NotasApp</a>
        </Link>
        <Link href="/new">
          <a className={styles.navButton}>
            Nueva Nota
          </a>
        </Link>
      </div>
    </nav>
  );
}
