import { useState } from "react";
import { State } from "../App.d";
import styles from './ShowJson.module.css';

export function ShowJson({ jsonFile, index, objectKey, startExpanded = false }: { jsonFile: State['jsonFile'], index?: number, objectKey?: string, startExpanded?: boolean }) {
  const [expanded, setExpanded] = useState(startExpanded);
  const leftSpacing = 18;

  if (typeof jsonFile === 'string' || typeof jsonFile === 'number' || typeof jsonFile === 'boolean' || jsonFile === null) {
    if (objectKey) {
      return (
        <p className={styles.paragraph} ><span className={styles.keys}>{objectKey}</span>: {jsonFile.toString()}</p>
      );
    }

    return (
      <p className={styles.paragraph} >{jsonFile.toString()}</p>
    )
  }

  if (Array.isArray(jsonFile) && !expanded) {
    if (index !== undefined) {
      return (
        <p className={styles.paragraph} onClick={() => setExpanded(true)}><span className={styles.numbers}>{index}</span>: [...]</p>
      )
    }
    return (
      <p className={styles.paragraph} onClick={() => setExpanded(true)}>[...]</p>
    )
  }

  if (Array.isArray(jsonFile) && expanded) {
    return (
      <>
        <p className={`${styles.paragraph} ${styles.markers}`} onClick={() => setExpanded(false)}>[</p>
        <div className={styles.tabber} style={{ paddingLeft: leftSpacing }}>
          {jsonFile.map((item, index) => (
            <ShowJson key={index} jsonFile={item} index={index} />
          ))}
        </div>
        <p className={`${styles.paragraph} ${styles.markers}`} onClick={() => setExpanded(false)}>]</p>
      </>
    )
  }

  if (!expanded) {
    if (objectKey !== undefined || index !== undefined) {
      const prefix = objectKey || index;
      const className = objectKey ? styles.keys : styles.numbers;
      return (
        <p className={styles.paragraph} onClick={() => setExpanded(true)}><span className={className}>{prefix}</span>: {"{...}"}</p>
      )
    }
    return (
      <p className={styles.paragraph} onClick={() => setExpanded(true)}>{"{...}"}</p>
    )
  }

  const jsonKeys = Object.keys(jsonFile);

  if (objectKey !== undefined || index !== undefined) {
    const prefix = objectKey || index;
    const className = objectKey ? styles.keys : styles.numbers;
    return (
      <>
        <p className={styles.paragraph} onClick={() => setExpanded(false)}><span className={className}>{prefix}</span>:</p>
        <div className={styles.tabber} style={{ paddingLeft: leftSpacing }}>
          {jsonKeys.map((key) => (
            <ShowJson key={key} jsonFile={jsonFile[key]} objectKey={key} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <p className={styles.paragraph} onClick={() => setExpanded(false)}>{"{"}</p>
      {jsonKeys.map((key) => (
        <ShowJson key={key} jsonFile={jsonFile[key]} objectKey={key} />
      ))}
      <p className={styles.paragraph} onClick={() => setExpanded(false)}>{"}"}</p>
    </>
  );
}
