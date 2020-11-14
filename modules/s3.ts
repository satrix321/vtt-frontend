import S3 from 'aws-sdk/clients/s3'

export default new S3({
  credentials: {
    accessKeyId: process.env.s3accessKeyId as string,
    secretAccessKey: process.env.s3secretAccessKey as string,
  },
  endpoint: process.env.s3Endpoint as string,
  s3ForcePathStyle: true,
})
