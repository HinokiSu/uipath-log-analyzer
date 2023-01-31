// formatted type
export type TLogsFileTable = {
  fileName: string
  time: string
  isParsed: string
  createdAt: string
  updatedAt: string
}

// Type from DB field
export type TLogsFileInfo = {
  id: string
  file_name: string
  time: string
  is_parsed: string
  created_at: string
  updated_at: string
}
