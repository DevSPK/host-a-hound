
//     const config = {
//       bucketName: process.env.S3_BUCKET,
//       region: process.env.S3_REGION,
//       accessKeyId: process.env.S3_KEY,
//       secretAccessKey: process.env.S3_SECRET,
//     };
//     const ReactS3Client = new S3(config);
//     ReactS3Client.uploadFile(file, newFileName).then((data) => {
//       console.log(data);
//       if (data.status === 204) {
//         console.log("success");
//       } else {
//         console.log("fail");
//       }
//     });
//   };
//   return (
//     <>
//       <div className='upload-steps' onChange={handleClick}>
//         <label>
//           Upload file:
//           <input type='file' ref={fileInput} />
//         </label>
//         <br />
        
//       </div>
//     </>
//   );
// }

// export default UploadImage;

import React , {useState} from 'react';
import awsS3Js from 'aws-s3-js'





// a React functional component, used to create a simple upload input and button

const UploadImage = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    console.log("this is .env", process.env.REACT_APP_S3_BUCKET)
    
    // the configuration information is fetched from the .env file
    
    
    const config = {
    
        bucketName: process.env.REACT_APP_S3_BUCKET,
        region: process.env.REACT_APP_S3_REGION,
        accessKeyId: process.env.REACT_APP_S3_KEY,
        secretAccessKey: process.env.REACT_APP_S3_SECRET,
    }

    console.log("this is bucketname", config.bucketName)
    
    ;

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = async (file) => {
        const S3Client = new awsS3Js(config);
        // the name of the file uploaded is used to upload it to S3
        S3Client
        .uploadFile(file, file.name)
        .then(data => console.log(data.location))
        .catch(err => console.error(err))
    }
    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <br></br>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImage;