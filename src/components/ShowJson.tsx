import { useState } from "react";
import styles from './ShowJson.module.css';
import { State } from "../App.d";

export function ShowJson({ jsonFile, index, objectKey, startExpanded = false }: { jsonFile?: State['jsonFile'], index?: number, objectKey?: string, startExpanded?: boolean }) {
  const [expanded, setExpanded] = useState(startExpanded);

  if (typeof jsonFile === 'string' || typeof jsonFile === 'number' || typeof jsonFile === 'boolean' || jsonFile === null) {
    if (objectKey) {
      return (
        <p>{objectKey}: {jsonFile.toString()}</p>
      );
    }

    return (
      <p>{jsonFile.toString()}</p>
    )
  }

  if (Array.isArray(jsonFile) && !expanded) {
    if (index !== undefined) {
      return (
        <p onClick={() => setExpanded(true)}>{index}: [...]</p>
      )
    }
    return (
      <p onClick={() => setExpanded(true)}>[...]</p>
    )
  }

  if (Array.isArray(jsonFile) && expanded) {
    return (
      <>
        <p onClick={() => setExpanded(false)}>[</p>
        {jsonFile.map((item, index) => (
          <ShowJson key={index} jsonFile={item} index={index} />
        ))}
        <p onClick={() => setExpanded(false)}>]</p>
      </>
    )
  }

  if (!expanded) {
    if (objectKey !== undefined || index !== undefined) {
      const prefix = objectKey || index;
      return (
        <p onClick={() => setExpanded(true)}>{prefix}: {"{...}"}</p>
      )
    }
    return (
      <p onClick={() => setExpanded(true)}>{"{...}"}</p>
    )
  }

  const jsonKeys = Object.keys(jsonFile);

  if (objectKey !== undefined || index !== undefined) {
    const prefix = objectKey || index;
    return (
      <>
        <p onClick={() => setExpanded(false)}><span className={styles['line-number']}>{prefix}:</span> {"{"}</p>
        {jsonKeys.map((key) => (
          <ShowJson key={key} jsonFile={jsonFile[key]} objectKey={key} />
        ))}
        <p onClick={() => setExpanded(false)}>{"}"}</p>
      </>
    );
  }

  return (
    <>
      <p onClick={() => setExpanded(false)}>{"{"}</p>
      {jsonKeys.map((key) => (
        <ShowJson key={key} jsonFile={jsonFile[key]} objectKey={key} />
      ))}
      <p onClick={() => setExpanded(false)}>{"}"}</p>
    </>
  );
}
