import Image from "next/image";
import React from "react";
import { PreviewProps } from "../../interfaces/FcInterface";
import Markdown from "../Markdown";

const Preview: React.FC<PreviewProps> = ({ formData, image_base64, state }) => {
	const { title, body } = formData;

	return (
		<div
			className={`${state ? "block sm:w-screen" : "hidden sm:block sm:w-[50%]"} prose pb-5 mx-auto`}
		>
			{image_base64 && (
				<div className="flex justify-center w-full mx-auto">
					<Image src={image_base64} className="-z-10" width={900} height={800} />
				</div>
			)}
			<div className="mt-5 mb-6 w-screen text-center sm:text-left">
				<h1 className="m-0 text-5xl">{title}</h1>
				{title && <p className="m-0 italic">Date Posted</p>}
			</div>
			<div className="mx-3 md:mx-0 break-words">
				<Markdown body={body} />
			</div>
		</div>
	);
};

export default Preview;
