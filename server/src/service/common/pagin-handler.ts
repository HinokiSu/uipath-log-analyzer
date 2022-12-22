// calc
export const calcOffset = (curPage: string, pageSize: string) =>
  (parseInt(curPage) - 1) * parseInt(pageSize)
