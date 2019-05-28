
import source from './source.json'

const user = "https://15110301@student.hcmute.edu.vn/"
const refreshToken = "1/RTctI2addR6xXOM-me_-REGoAjejngb3TsDYeN8Paho"
const accessToken = "ya29.GlsWB4oL9FBTT4lBy4NP8dbV9PLrEfRFkZMdH04I9GHSuUTQJfu39N1LYS-ddzB6MHSKPaeEZvl5-wuyQ8_wJwBmOD05jSnDpDmRs8YjxX6Js9Vx5HiKxc5t48Zx"

export default {
  user,
  clientId: source.web.client_id,
  clientSecret: source.web.client_secret,
  refreshToken,
  accessToken
}