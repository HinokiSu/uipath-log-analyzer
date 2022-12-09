// methods of creating sql string
export const createSqlField = (fieldArr: string[]) => fieldArr.join(',')
export const createSqlValuesMark = (fieldArr: string[]) => fieldArr.map(() => '?').join(',')
