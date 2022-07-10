import axios from "axios";

export default axios.create({
	baseURL: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image`,
});
