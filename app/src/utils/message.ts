import { message } from 'ant-design-vue'
const info = (msg: string, duration: number = 2) => {
  return message.info(msg, duration)
}

const ok = (msg: string, duration: number = 2) => {
  return message.success(msg, duration)
}
const err = (msg: string, duration: number = 2) => {
  return message.error(msg, duration)
}
const warn = (msg: string, duration: number = 2) => {
  return message.warning(msg, duration)
}

const msg = {
  info,
  ok,
  err,
  warn
}

export default msg
