import Image from "next/image";
import React from "react";
import { PreviewProps } from "../../interfaces/FcInterface";
import Markdown from "../Markdown";

const Preview: React.FC<PreviewProps> = ({ formData, image_base64, state }) => {
	const { title, body } = formData;

	return (
		<div className={`${state ? "w-screen" : "w-[50%]"} prose pb-5`}>
			{image_base64 && (
				<div className="flex justify-center w-full mx-auto bg-black bg-opacity-60">
					<Image src={image_base64} className="-z-10" width={1500} height={1100} />
				</div>
			)}
			<div className="mt-5 mb-6 w-screen">
				<h1 className="m-0 text-5xl">{title}</h1>
				{title && <p className="m-0 italic">Date Posted</p>}
			</div>
			<Markdown body={body} />
		</div>
	);
};

export default Preview;
