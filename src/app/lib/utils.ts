import { jwtDecode } from 'jwt-decode'

export function validateRefreshToken(token: string): boolean {
  try {
    const decodedToken: any = jwtDecode(token)
    const currentTime = Date.now() / 1000

    // Check if the token has expired
    if (decodedToken.exp < currentTime) {
      console.log('Refresh token has expired')
      return false
    }

    return true
  } catch (error) {
    console.log('Invalid refresh token')
    return false
  }
}

export function getRefreshToken(): string {
  const match = document.cookie.match(new RegExp('(^| )refresh_token=([^;]+)'))
  return match ? match[2] : ''
}
