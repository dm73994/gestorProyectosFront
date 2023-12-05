export const getFileName = (path: string) => {
  const name: string = String(path).split('\\').pop()
  return name !== 'null'? name : null
}