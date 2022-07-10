import { ChangeEvent, FormEvent, useState } from "react";
import PostForm from "../../components/postForm";
import Preview from "../../components/Preview";
import { formData } from "../../interfaces/FcInterface";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PostPage = () => {
	const [formData, setFormData] = useState<formData>({
		title: "",
		body: "",
	});
	const [file, setFile] = useState<string>();
	const [preview, setPreview] = useState<boolean>(false);

	const { title, body } = formData;

	const onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();

		reader.onload = () => {
			setFile(reader.result as string);
		};

		if (e.target.files![0] instanceof Blob) {
			reader.readAsDataURL(e.target.files![0]);
		}
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const file = e.currentTarget;
	};

	return (
		<div className="w-full flex relative overflow-hidden justify-center">
			{!preview && (
				<>
					<PostForm
						formData={formData}
						onChange={onChange}
						onImageChange={imageChange}
						image_base64={file}
						onSubmit={onSubmit}
					/>
					<div className="divider divider-horizontal p-0 m-0"></div>
				</>
			)}
			<Preview formData={formData} image_base64={file} state={preview} />
			<button
				className="btn fixed bottom-3 right-8 gap-3 flex"
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
		</div>
	);
};

export default PostPage;
