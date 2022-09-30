export const adminCredentials = {
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    }
  }
//process.env

export const userPoolID = process.env.REACT_APP_USER_POOL_ID
