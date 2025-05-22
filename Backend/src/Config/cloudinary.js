const name = "de0ptl175";
const key = "762841274762878";
const api = "IwNc1R8xV8heir2wiTIssoFEC2E";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: name,
  api_key: key,
  api_secret: api,
});

export default cloudinary;
