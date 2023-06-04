const uuid = require("uuid").v4;
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

exports.s3Uploadv3 = async (file) => {
  if (file) {
    const s3 = new S3Client();
    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
    const command = new PutObjectCommand(param);
    let response = await s3.send(command);
    response = { ...response, name: param.Key };
    return response;
  }
};
