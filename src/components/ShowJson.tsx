import { useState } from "react";
import { State } from "../App.d";

export function ShowJson({ jsonFile, index, objectKey }: { jsonFile?: State['jsonFile'], index?: number, objectKey?: string }) {
  const [expanded, setExpanded] = useState(false);

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

  if (!expanded) {
    if (objectKey !== undefined) {
      return (
        <p onClick={() => setExpanded(true)}>{objectKey}: {"{...}"}</p>
      )
    }
    return (
      <p onClick={() => setExpanded(true)}>{"{...}"}</p>
    )
  }

  if (Array.isArray(jsonFile) && expanded) {
    return (
      <>
        {jsonFile.map((item, index) => (
          <ShowJson key={index} jsonFile={item} index={index} />
        ))}
      </>
    )
  }

  const jsonKeys = Object.keys(jsonFile);

  return (
    <>
      {jsonKeys.map((key) => (
        <ShowJson key={key} jsonFile={jsonFile[key]} objectKey={key} />
      ))}
    </>
  );
}
