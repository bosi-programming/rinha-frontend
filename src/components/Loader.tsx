import styles from './Loader.module.css';
export function Loader({ progress }: { progress: number }) {
  return (
    <div className={styles.container}>
      <div className={styles['loading-bar']}>
        <div
          className={styles.loaded}
          style={{
            width: `${progress}%`,
          }}
        >
          {`${progress}%`}
        </div>
      </div>
    </div>
  );
}
