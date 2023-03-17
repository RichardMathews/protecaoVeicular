import jwt_decode from 'jwt-decode'

export const decoded = async (authorization) => {
  try {
    let decoded: any = jwt_decode(authorization)

    return decoded

  } catch (error) {
    return new Error(error)
  }
}