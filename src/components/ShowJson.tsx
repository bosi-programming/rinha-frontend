import { useState, useEffect, useCallback } from "react";
import { State } from "../App.d";
import styles from './ShowJson.module.css';

const threadhold = 50;
const leftSpacing = 18;
const lineHeight = 34;
const maxItemsToShow = Math.ceil(window.innerHeight / lineHeight) + threadhold;

export function ShowJson({ jsonFile, index, objectKey, startExpanded = false }: { jsonFile: State['jsonFile'], index?: number, objectKey?: string, startExpanded?: boolean }) {
  const [visibleItems, setVisibleItems] = useState<State['jsonFile'][]>([]);
  const [expanded, setExpanded] = useState(startExpanded);
  const prefix = objectKey || index;
  const prefixClassName = objectKey ? styles.keys : styles.numbers;

  const calculateVisibleItems = useCallback(() => {
    const jsonKeys = Object.keys(jsonFile).sort();
    const items = Array.isArray(jsonFile) ? jsonFile : jsonKeys;

    if (items.length > threadhold) {
      const endIndex = Math.ceil(
        threadhold + maxItemsToShow + Math.ceil(window.scrollY / lineHeight)
      );

      console.log('endIndex', endIndex);

      const newItems = items.slice(0, endIndex + 1);
      setVisibleItems(newItems);
    } else {
      const newItems = items.slice(0, threadhold);
      setVisibleItems(newItems);
    }
  }, [jsonFile]);

  useEffect(() => {
    calculateVisibleItems();
    window.addEventListener('scroll', calculateVisibleItems);

    return () => {
      window.removeEventListener('scroll', calculateVisibleItems);
    };
  }, [calculateVisibleItems]);

  const handleExpand = () => {
    setExpanded(true);
    calculateVisibleItems();
  };

  if (typeof jsonFile === 'string' || typeof jsonFile === 'number' || typeof jsonFile === 'boolean' || jsonFile === null) {
    if (objectKey) {
      return (
        <p className={styles.paragraph} ><span className={styles.keys}>{objectKey}</span>: {jsonFile?.toString()}</p>
      );
    }

    return (
      <p className={styles.paragraph} >{jsonFile?.toString()}</p>
    )
  }

  if (Array.isArray(jsonFile) && !expanded) {
    if (objectKey !== undefined || index !== undefined) {
      return (
        <p className={styles.paragraph} onClick={() => handleExpand()}><span className={prefixClassName}>{prefix}</span>: [...]</p>
      )
    }
    return (
      <p className={styles.paragraph} onClick={() => handleExpand()}>[...]</p>
    )
  }

  if (!expanded) {
    if (objectKey !== undefined || index !== undefined) {
      return (
        <p className={styles.paragraph} onClick={() => handleExpand()}><span className={prefixClassName}>{prefix}</span>: {"{...}"}</p>
      )
    }
    return (
      <p className={styles.paragraph} onClick={() => handleExpand()}>{"{...}"}</p>
    )
  }

  if (Array.isArray(jsonFile) && expanded) {
    return (
      <>
        <p className={`${styles.paragraph} ${styles.markers}`} onClick={() => setExpanded(false)}>{prefix && <span className={prefixClassName}>{prefix}: </span>}[</p>
        <div className={styles.tabber} style={{ paddingLeft: leftSpacing }}>
          {visibleItems.map((item, index) => (
            <ShowJson key={index} jsonFile={item} index={index} />
          ))}
        </div>
        <p className={`${styles.paragraph} ${styles.markers}`} onClick={() => setExpanded(false)}>]</p>
      </>
    )
  }

  if (objectKey !== undefined || index !== undefined) {
    const prefix = objectKey || index;
    const className = objectKey ? styles.keys : styles.numbers;
    return (
      <>
        <p className={styles.paragraph} onClick={() => setExpanded(false)}><span className={className}>{prefix}</span>:</p>
        <div className={styles.tabber} style={{ paddingLeft: leftSpacing }}>
          {visibleItems.map((item, index) => (
            <ShowJson key={index} jsonFile={jsonFile[item]} objectKey={item} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <p className={styles.paragraph} onClick={() => setExpanded(false)}>{prefix && <span className={prefixClassName}>{prefix}: </span>}{"{"}</p>
      <div className={styles.tabber} style={{ paddingLeft: leftSpacing }}>
        {visibleItems.map((item, index) => (
          <ShowJson key={index} jsonFile={jsonFile[item]} objectKey={item} />
        ))}
      </div>
      <p className={styles.paragraph} onClick={() => setExpanded(false)}>{"}"}</p>
    </>
  );
}
