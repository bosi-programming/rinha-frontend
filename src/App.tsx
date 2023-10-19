import { useState } from "react";
import "./App.css";
import { LoadJSON } from "./screens/LoadJson";

function App() {
  // TODO: evoulir para useReducer
  const [error, setError] = useState("");
  const [jsonFile, setJSONFile] = useState<TJSON>(null);
  const [fileName, setFileName] = useState("");

  console.log(jsonFile);

  return (
    <main>
      {!jsonFile && <LoadJSON error={error} setError={setError} jsonFile={jsonFile} setJsonFile={setJSONFile} setFileName={setFileName} />}
    </main>
  );
}

export default App;
