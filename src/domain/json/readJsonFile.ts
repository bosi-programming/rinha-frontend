export function readJsonFile(file: File, setError: (error: string) => void, setJsonFile: (json: TJSON) => void) {
  const jsonFileReader = new FileReader();

  function readerProgressHandler(e: ProgressEvent<FileReader>) {
    // Will use to show progress bar
    if (e.lengthComputable) {
      const percentLoaded = Math.round((e.loaded / e.total) * 100);
      console.log(percentLoaded);
    }
  }

  function readerLoadHandler(e: ProgressEvent<FileReader>) {
    const fileContent = e.target.result as string;
    try {
      const fileContentNormalized = JSON.stringify(JSON.parse(fileContent), null, 2);
      globalThis.jsonFileContent = fileContentNormalized;
      setJsonFile({
        contentGlobalKey: "jsonFileContent",
        name: fileName.current,
      });
      setError("");
    } catch (err) {
      setError("Invalid JSON file. Please load a valid JSON file.");
    }
  }

  jsonFileReader.addEventListener("progress", readerProgressHandler);
  jsonFileReader.addEventListener("load", readerLoadHandler);
  jsonFileReader.readAsText(file, "UTF-8");

  setError("");
}
