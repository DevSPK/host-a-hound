import boto3
import botocore
import botocore.exceptions
import os
import uuid
import logging


# Enable Boto3 debug logging
boto3.set_stream_logger('', logging.DEBUG)

BUCKET_NAME = os.environ.get("S3_BUCKET")
print("this is BucketName", BUCKET_NAME)
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)


def allowed_file(filename):
    print("==========this is filename in allowed_file", filename)
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    print("==========this is unique_filename in unique fliname", unique_filename)
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    print("-----------this is file in upload_file_to_s3", file)
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    # except botocore.exceptions.ClientError as e:
    #     # Specific handling for client error
    #     error_code = e.response['Error']['Code']
    #     error_message = e.response['Error']['Message']
    #     print("+++++++++++++++++this is error_code", error_code)
    #     print("+++++++++++++++++this is error_message", error_message)
    #     return {"errors": f"{error_code}: {error_message}"}
    # except Exception as e:
    #     # in case the our s3 upload fails
    #     print("+++++++++++++++++this is error", e)
    except Exception as e:
        print(e.response['Error']['Message'])  # Print the error message
        print(e.response['ResponseMetadata'])  # Print the response metadata
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}
