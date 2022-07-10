import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { postData } from "../interfaces/ApiInterface";
import api from "./api/api";

async function postBlog({ data }: { data: postData }) {
	const res = await api.post("/post", {
		title: data.title,
		body: data.body,
		image: data.image,
		image_key: data.image_key,
	});

	return res.data;
}

export const usePostBlog = () => {
	return useMutation(postBlog, {
		onSuccess: () => {
			toast.success("Successfully posted!");
		},
		onError: async (err: any) => {
			toast.error(err.response.data.message || err.message);
		},
		retry: false,
	});
};
