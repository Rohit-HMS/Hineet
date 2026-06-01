export const getFrontendUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/$/, '')
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://hineet-nqse.vercel.app'
  }
  return 'http://localhost:3000'
}
