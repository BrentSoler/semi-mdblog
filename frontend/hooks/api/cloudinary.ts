import axios from "axios";

export default axios.create({
	baseURL: `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image`,
});
