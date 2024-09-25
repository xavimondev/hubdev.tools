export const INVALID_DOMAINS = [
  'google.com',
  'youtube.com',
  'facebook.com',
  'x.com',
  'twitter.com',
  'instagram.com',
  'linkedin.com',
  'wikipedia.org',
  'reddit.com',
  'pinterest.com',
  'tumblr.com',
  'quora.com',
  'yahoo.com',
  'bing.com',
  'tiktok.com',
  'amazon.com',
  'ebay.com',
  'alibaba.com',
  'aliexpress.com',
  'netflix.com',
  'hulu.com',
  'vimeo.com',
  'dropbox.com',
  'blogger.com',
  'medium.com',
  'flickr.com',
  'spotify.com',
  'soundcloud.com',
  'apple.com',
  'airbnb.com'
]

export const isDomainInvalid = ({ url }: { url: string }) => {
  const domain = new URL(url).hostname
  return INVALID_DOMAINS.some((invalidDomain) => domain.includes(invalidDomain))
}
