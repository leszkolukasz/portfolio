import fs from "node:fs";

export const toBase64 = (path: string) => {
  return fs.readFileSync(path, { encoding: "base64" });
};
