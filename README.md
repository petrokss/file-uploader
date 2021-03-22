# Test Backend task for Locarto

A Node.js server for uploading files on S3 bucket by a [AWS pre-signed][aws-pre-signed] POST policy.

### Technologies used:

- Express
- Graphql
- MongoDB
- AWS SDK
- AWS S3
- Docker

### Uploading Process
1. Client makes a request on `saveMetaData` mutation with required parameters: 
    ```
    name: String
    size: String
    contentType: String
    ```
2. The new arguments are validated on the unique name in the Database and allowed Content-Types. After that the record is added to the database. 
3. Client receives the object of two properties: 
    ```
    url: String (AWS link for uploading the file)
    fields: Array (array of key-value objects that should be used by Client to append to FormData) 
    ```
4. After a successful upload Client calls mutation `resolveUploadFile` with `name` argument, which was specified in the `saveMetaData` mutation. On the server the record is marked as `resolved: true` meaning that the file has been uploaded to S3.
 
 ### ENV Configuration
 The server uses `.env` and has the following default configurations
 ```
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017
AWS_ACCESS_KEY_ID=<IAM ACCESS KEY>
AWS_SECRET_ACCESS_KEY=<IAM SECRET ACCESS KEY>
AWS_S3_BUCKET=locarto-379
MAX_FILE_SIZE=100000000
MIN_FILE_SIZE=0
ALLOWED_CONTENT_TYPES=image/png,image/jpeg
ALLOWED_EXTENSIONS=png,jpeg
DB_NAME=locarto
 ```

### Installation
Clone the repository, then install the required dependencied with `npm i`.
Then you need to run MongoDB. Please follow the official [docs](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/).
After connecting to Mongo and configuring the `.env` file, start the server with

```sh
npm start
```

  [aws-pre-signed]: <https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createPresignedPost-property>

