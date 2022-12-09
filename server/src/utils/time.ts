import dayjs from 'dayjs'

export const nowTime = (format: string="YYYY-MM-DD HH:mm:ss") => {
    return dayjs().format(format)
}