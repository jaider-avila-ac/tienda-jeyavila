const TOKEN_KEY  = 'jey_avila_music_token'
const USER_KEY   = 'jey_avila_music_user'

export const tokenStore = {
  set(token, user) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY))
    } catch {
      return null
    }
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  isLoggedIn() {
    return !!localStorage.getItem(TOKEN_KEY)
  },
}
