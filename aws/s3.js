const AWS = require("aws-sdk");
AWS.config.update({ region: 'eu-west-1' })
const s3 = new AWS.S3({ region: 'eu-west-1' });

const generateUploadLink = args => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Fields: {
      key: args.name,
      'Content-Type': args.contentType,
    },
    Conditions: [
			["content-length-range", 	process.env.MIN_FILE_SIZE, process.env.MAX_FILE_SIZE], // content length restrictions: min-max size
		]
  };
  return new Promise((resolve, reject) => s3.createPresignedPost(params, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  }));
};

module.exports = {
  generateUploadLink,
};
