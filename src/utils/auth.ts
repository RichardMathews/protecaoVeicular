export async function validate(decoded, request) {
  if (!decoded) {
    return { isValid: false };
  } else {

    request.auth.credentials = {
      'user': decoded,
      'token': request.headers['authorization']
    };
    return { isValid: true };
  }
}