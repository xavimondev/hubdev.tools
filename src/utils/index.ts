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

export const removeMarkdownFormatting = ({ markdownText }: { markdownText: string }) => {
  const text = markdownText
    .replace(/\*\*(.*?)\*\*/g, '$1') // bold
    .replace(/\*(.*?)\*/g, '$1') // italic
    .replace(/__(.*?)__/g, '$1') // underline
    .replace(/_(.*?)_/g, '$1') // italic
    .replace(/`(.*?)`/g, '$1') // inline code
    .replace(/!\[(.*?)\]\((.*?)\)/g, '') // images
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1') // links
    .replace(/#+\s(.*?)/g, '$1') // headers
    .replace(/> (.*?)/g, '$1') // blockquotes
    .replace(/[-*+]\s(.*?)/g, '$1') // list items
    .replace(/^\s*[\r\n]/gm, '') // remove empty lines

  return text
}
