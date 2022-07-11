import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import PostForm from "../../components/postForm";
import Preview from "../../components/Preview";
import { formData } from "../../interfaces/FcInterface";
import cloudinaryApi from "../../hooks/api/cloudinary";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { usePostBlog } from "../../hooks/usePost";
import { postData } from "../../interfaces/ApiInterface";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/router";

const PostPage = () => {
	const [formData, setFormData] = useState<formData>({
		title: "",
		body: "",
	});
	const [image, setImage] = useState<string>();
	const [preview, setPreview] = useState<boolean>(false);
	const { mutate, isLoading, isSuccess } = usePostBlog();
	const router = useRouter();

	const { title, body } = formData;

	const onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (isSuccess) {
			setFormData({
				title: "",
				body: "",
			});
			setImage(undefined);
			router.push("/");
		}
	}, [isSuccess]);

	const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();

		reader.onload = () => {
			setImage(reader.result as string);
		};

		if (e.target.files![0] instanceof Blob) {
			reader.readAsDataURL(e.target.files![0]);
		}
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!title || !body || !image) {
			toast.error("Missing Fields");
			return;
		}

		const file = e.currentTarget;
		// @ts-ignore
		const fileInput: any = Array.from(file.elements).find(({ name }) => name === "file");

		const formData = new FormData();

		for (const image of fileInput.files) {
			formData.append("file", image);
		}

		formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET as string);

		const res = await cloudinaryApi.post(`/upload`, formData);

		const posted: postData = {
			title: title,
			body: body,
			image: res.data.url,
			image_key: res.data.public_id,
		};

		if (res.data) {
			mutate({ data: posted });
		} else {
			toast.error("Something went wrong.Try Again");
		}
	};

	return (
		<div className="w-full flex relative justify-center flex-col lg:flex-row overflow-hidden">
			{isLoading && <Spinner />}
			<div
				className={`${
					preview ? "hidden" : "md:flex w-full lg:w-[50%] md:items-center md:flex-col lg:flex-row"
				}`}
			>
				<PostForm
					formData={formData}
					onChange={onChange}
					onImageChange={imageChange}
					image_base64={image}
					onSubmit={onSubmit}
				/>
				<div className="hidden sm:divider lg:divider-horizontal p-0 m-0"></div>
			</div>
			<Preview formData={formData} image_base64={image} state={preview} />
			<button
				className="btn fixed bottom-3 w-max right-8 gap-3 hidden sm:flex"
				onClick={() => setPreview(!preview)}
			>
				{!preview ? (
					<AiOutlineEye className="text-xl" />
				) : (
					<AiOutlineEyeInvisible className="text-xl" />
				)}
				{preview && <>Close </>}
				Preview
			</button>
			<button
				className="btn fixed bottom-3 w-max left-6 gap-3 flex sm:hidden bg-opacity-50 sm:bg-opacity-100"
				onClick={() => setPreview(!preview)}
			>
				{!preview ? (
					<AiOutlineEye className="text-xl" />
				) : (
					<AiOutlineEyeInvisible className="text-xl" />
				)}
			</button>
		</div>
	);
};

export default PostPage;
