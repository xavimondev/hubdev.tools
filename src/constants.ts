export const NUMBER_OF_GENERATIONS_TO_FETCH = 11
export const ROWS_PER_PAGE = 12

export const APP_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://hubdev.tools'

export const HREF_PREFIX = `${APP_URL}?ref=`

export const DEFAULT_BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=='

export const MAX_PINS = 40
export const MAX_TOP_PINS = 10
