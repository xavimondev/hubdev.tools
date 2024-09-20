export const extractDomain = (url: string) => {
  try {
    const parsedUrl = new URL(url)
    let hostname = parsedUrl.hostname

    // Si el hostname empieza con 'www.', lo eliminamos
    if (hostname.startsWith('www.')) {
      hostname = hostname.substring(4)
    }

    return hostname
  } catch (error) {
    console.error('Invalid URL:', error)
    return ''
  }
}

export const copyToClipboard = async ({ content }: { content: string }) => {
  if (navigator.clipboard) navigator.clipboard.writeText(content)
}
