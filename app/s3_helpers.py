# import resources

import boto3
import botocore
import os
import uuid

# get and set values
BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

# get S3 values from environment
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET"),
)


def allowed_file(filename):
    """
    checks for allowed files names
    """
    print(filename)
    print("." in filename)
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    """
    creates unique filename using uuid module from python
    """
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    """
    uploads the file to s3 and returns url if successful
    """
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={"ACL": acl, "ContentType": file.content_type},
        )
    except Exception as e:
        # in case the our s3 upload fails
        print("this is exception on s3 upload")
        print("this is e", e)
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}
