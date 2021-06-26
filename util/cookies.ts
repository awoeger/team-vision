import { serialize } from 'cookie';

export function createSerializedSessionCookie(token: string) {
  // Detect weather we're in a production environment
  // eg. Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  // Save the token in a cookie on the user's machine

  // (cookies get sent automatically to the server every time
  // a user makes a request)
  // 'sessionToken' = name, token = value
  // maxAge: whenever it hits maxAge, cookie will be deleted
  // 60 * 60 * 24 = 24 hours
  const maxAge = 60 * 60 * 24;

  return serialize('sessionToken', token, {
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    // Important for security
    // Deny cookie access from frontend JavaScript
    httpOnly: true,

    // Important for security
    // Set secure cookies on production
    secure: isProduction,

    path: '/',

    // https://web.dev/samesite-cookies-explained/
    // If you set SameSite to Strict, your cookie will only be sent in a first-party context
    sameSite: 'lax',
  });
}
