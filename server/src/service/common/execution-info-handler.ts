
/**
 * handle execution info of process
 * @param processName string
 * @param type boolean, default: true, execution started info
 * @returns handled execution info
 */
export const handleExecutionInfo = (processName: string, type = true): string => {
    if (type) {
      return processName + ' execution started'
    } else {
      return processName + ' execution ended'
    }
  }