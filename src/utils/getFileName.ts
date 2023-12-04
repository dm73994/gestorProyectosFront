export const getFileName = (path: string) => {
  return String(path).split('\\').pop()
}