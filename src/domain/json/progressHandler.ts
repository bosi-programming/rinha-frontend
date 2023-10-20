export function progressHandler(e: ProgressEvent<FileReader>) {
  // TODO: use to show progress bar
  if (e.lengthComputable) {
    const percentLoaded = Math.round((e.loaded / e.total) * 100);
    console.log(percentLoaded);
  }
}

