const validateMetaData = (args) => {
  const allowedExtensions = process.env.ALLOWED_EXTENSIONS.split(',');
  const allowedContentTypes = process.env.ALLOWED_CONTENT_TYPES.split(',');
  if (!allowedExtensions.includes(args.name.split('.')[1])) {
    throw new Error('Please specify the extension:');
  }
  if (!allowedContentTypes.includes(args.contentType)) {
    throw new Error('Specified content type is not allowed');
  }
  return true;
};

module.exports = { validateMetaData };
