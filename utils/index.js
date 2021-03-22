const validateMetaData = args => {
  if (!process.env.ALLOWED_EXTENSIONS.split(',').includes(args.name.split('.')[1])) {
    throw new Error('Please specify the extension:');
  }
  if (!process.env.ALLOWED_CONTENT_TYPES.split(',').includes(args.contentType)) {
    throw new Error('Specified content type is not allowed');
  }
  return true;
};

module.exports = { validateMetaData };