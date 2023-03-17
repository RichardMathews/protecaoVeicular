const bcrypt = require('bcrypt');

export const encrypt = async (data) => {
  data = await bcrypt.hash(data, 10)

  return data
}