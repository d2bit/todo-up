import dayjs from 'dayjs'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'HH:mm'

export function formatDate(dateInput) {
  const dateObject = dayjs(dateInput)

  if (isToday(dateObject)) {
    return dateObject.format(TIME_FORMAT)
  }
  return dateObject.format(DATE_FORMAT)
}

export function isToday(date) {
  return dayjs().format(DATE_FORMAT) === dayjs(date).format(DATE_FORMAT)
}
