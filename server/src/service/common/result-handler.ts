type TResultParams = {
  message: string
  data?: object
}


export const handleSuccess = ({ message, data = {} }: TResultParams) => {
  return {
    message: 'Info: ' + message,
    status: 200,
    data
  }
}

export const handleFailed = ({ message, data = {} }: TResultParams) => {
  return {
    message: 'Error: ' + message,
    status: 0,
    data
  }
}
