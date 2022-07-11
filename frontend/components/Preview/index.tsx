import Image from "next/image";
import React from "react";
import { PreviewProps } from "../../interfaces/FcInterface";
import Markdown from "../Markdown";
import Avatar from "../../public/logo.png";

const Preview: React.FC<PreviewProps> = ({ formData, image_base64, state }) => {
	const { title, body } = formData;

	return (
		<div
			className={`${
				state ? "flex flex-col sm:w-[80vw]" : "hidden sm:flex sm:flex-col sm:w-[50%]"
			} pb-5 mx-auto`}
		>
			<div className="mt-5 mb-6 w-screen text-center sm:text-left prose ">
				<div className="avatar flex items-center gap-2">
					<div className="rounded-3xl">
						<Image src={Avatar} width={45} height={45} />
					</div>
					<p className="text-lg">Username</p>
				</div>
				<h1 className="m-0 text-5xl">{title}</h1>
				{title && <p className="m-0 italic">Date Posted</p>}
			</div>
			{image_base64 && (
				<div className="w-[80%] flex justify-center self-center">
					<Image src={image_base64} width={900} height={500} priority />
				</div>
			)}

			<div className="divider"></div>

			<div className="mx-3 md:mx-0 break-words prose ">
				<Markdown body={body} />
			</div>
		</div>
	);
};

export default Preview;
