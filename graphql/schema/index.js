const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type FilesMetadata {
    name: String
    size: String
    contentType: String
    processed: Boolean
  }

  type FieldInfo {
    key: String
    value: String
  }

  type SaveMetadataResponse {
    url: String
    fields: [FieldInfo] 
  }

  type Query {
    getAllFilesMetadata: [FilesMetadata]
  }

  type Mutation {
    saveMetaData(name: String! size: String! contentType: String!): SaveMetadataResponse
    resolveUploadFile(name: String): Boolean
  }
`);
