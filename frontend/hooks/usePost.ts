import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { blogData, postData, blog } from "../interfaces/ApiInterface";
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

export const getBlogs = async () => {
	const res = await api.get("/post");

	return res.data.data;
};

export const useBlog = () => {
	return useQuery<blogData>("blogs", getBlogs, {
		refetchOnWindowFocus: false,
		onError: (err: any) => {
			{
				err.response.data && toast.error(err.response.data.message);
			}
			{
				!err.response.data && toast.error(err.message);
			}
		},
	});
};

export const getBlogsByID = async (id: any) => {
	const res = await api.get("/post", {
		params: {
			id: id,
		},
	});

	return res.data.data;
};

export const useBlogById = (id: any) => {
	return useQuery<blog>(["blogsbyid", id], () => getBlogsByID(id), {
		refetchOnWindowFocus: false,
		onError: (err: any) => {
			{
				err.response.data && toast.error(err.response.data.message);
			}
			{
				!err.response.data && toast.error(err.message);
			}
		},
	});
};
