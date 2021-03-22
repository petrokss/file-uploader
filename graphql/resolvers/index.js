const { generateUploadLink } = require('../../aws/s3');
const { validateMetaData } = require('../../utils');

module.exports = (db) => ({
  getAllFilesMetadata: async () =>
    await db.collection('files_metadata').find({}).toArray(),
  saveMetaData: async (args) => {
    validateMetaData(args);
    const check = await db
      .collection('files_metadata')
      .find({ name: args.name })
      .count();
    if (check > 0) {
      throw new Error('File name already exists, please create another one');
    }
    await db
      .collection('files_metadata')
      .insertOne({ ...args, processed: false });
    const fieldsArray = [];
    const data = await generateUploadLink(args);
    Object.keys(data.fields).forEach((field) => {
      fieldsArray.push({ key: field, value: data.fields[field] });
    });
    return { url: data.url, fields: fieldsArray };
  },
  resolveUploadFile: async (args) => {
    const result = await db
      .collection('files_metadata')
      .updateOne({ name: args.name }, { $set: { processed: true } });
    return Boolean(result.result.n);
  },
});
