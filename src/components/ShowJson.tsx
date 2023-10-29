import { useState, useRef, useEffect, useCallback } from "react";
import { State } from "../App.d";
import styles from './ShowJson.module.css';

export function ShowJson({ jsonFile, index, objectKey, startExpanded = false }: { jsonFile: State['jsonFile'], index?: number, objectKey?: string, startExpanded?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<State['jsonFile'][]>([]);
  const [expanded, setExpanded] = useState(startExpanded);
  const leftSpacing = 18;

  const calculateVisibleItems = useCallback(() => {
    const jsonKeys = Object.keys(jsonFile);
    const items = Array.isArray(jsonFile) ? jsonFile : jsonKeys;

    const container = containerRef.current;
    if (container) {
      const { offsetHeight } = container;
      const startIndex = Math.floor(window.scrollY / 34);
      const endIndex = Math.min(
        items.length - 1,
        startIndex + 50 + Math.ceil(offsetHeight / 34),
      );

      const newItems = items.slice(startIndex, endIndex + 1);
      setVisibleItems(newItems);
    } else {
      const newItems = items.slice(0, 49 + 1);
      setVisibleItems(newItems);
    }
  }, [jsonFile]);

  useEffect(() => {
    calculateVisibleItems();
    window.addEventListener('scroll', calculateVisibleItems);

    return () => {
      window.removeEventListener('scroll', calculateVisibleItems);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (index !== undefined) {
      return (
        <p className={styles.paragraph} onClick={() => handleExpand()}><span className={styles.numbers}>{index}</span>: [...]</p>
      )
    }
    return (
      <p className={styles.paragraph} onClick={() => handleExpand()}>[...]</p>
    )
  }

  if (!expanded) {
    if (objectKey !== undefined || index !== undefined) {
      const prefix = objectKey || index;
      const className = objectKey ? styles.keys : styles.numbers;
      return (
        <p className={styles.paragraph} onClick={() => handleExpand()}><span className={className}>{prefix}</span>: {"{...}"}</p>
      )
    }
    return (
      <p className={styles.paragraph} onClick={() => handleExpand()}>{"{...}"}</p>
    )
  }

  if (Array.isArray(jsonFile) && expanded) {
    return (
      <>
        <p className={`${styles.paragraph} ${styles.markers}`} onClick={() => setExpanded(false)}>[</p>
        <div className={styles.tabber} ref={containerRef} style={{ paddingLeft: leftSpacing }}>
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
        <div className={styles.tabber} ref={containerRef} style={{ paddingLeft: leftSpacing }}>
          {visibleItems.map((key) => (
            <ShowJson key={key} jsonFile={jsonFile[key]} objectKey={key} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <p className={styles.paragraph} onClick={() => setExpanded(false)}>{"{"}</p>
      <div className={styles.tabber} ref={containerRef} style={{ paddingLeft: leftSpacing }}>
        {visibleItems.map((key) => (
          <ShowJson key={key} jsonFile={jsonFile[key]} objectKey={key} />
        ))}
      </div>
      <p className={styles.paragraph} onClick={() => setExpanded(false)}>{"}"}</p>
    </>
  );
}
