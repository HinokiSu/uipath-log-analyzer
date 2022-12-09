import dayjs from 'dayjs'

export const nowTime = (format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs().format(format)
}
