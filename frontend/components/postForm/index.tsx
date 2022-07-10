import React from "react";
import { PostPageProps } from "../../interfaces/FcInterface";
import { MdOutlineSendToMobile } from "react-icons/md";

const PostForm: React.FC<PostPageProps> = ({
	formData,
	image_base64,
	onChange,
	onImageChange,
	onSubmit,
}) => {
	const { title, body } = formData;

	return (
		<div className="w-full p-5 justify-center">
			<form className="flex flex-col gap-4 justify-center min-h-screen" onSubmit={onSubmit}>
				<h1 className="font-semibold">Thumbnail:</h1>
				<input
					type="file"
					name="file"
					className="file:btn-primary file:rounded-md file:w-max file:py-3 file:px-5 file:cursor-pointer bg-base-300 rounded-md"
					onChange={onImageChange}
					accept=".png,.jpeg,.webp,.jpg"
				/>
				<div className="h-[15rem] w-[15rem] border border-gray-300 flex mx-auto">
					<img src={image_base64} className="w-full" />
				</div>
				<h1 className="font-semibold">Title:</h1>
				<input
					type="text"
					className="input input-bordered"
					name="title"
					placeholder="Enter title..."
					value={title}
					onChange={onChange}
				/>
				<h1 className="font-semibold">Body:</h1>
				<textarea
					className="input input-bordered min-h-[20rem] p-3"
					name="body"
					placeholder="Enter body..."
					value={body}
					onChange={onChange}
				/>
				<button
					type="submit"
					className="btn-primary bg-primary text-white rounded-md py-4 px-6 place-self-end flex items-center gap-3"
				>
					<MdOutlineSendToMobile /> Submit
				</button>
			</form>
		</div>
	);
};

export default PostForm;
