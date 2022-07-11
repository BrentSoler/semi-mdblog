import Image from "next/image";
import React from "react";
import { blog } from "../../interfaces/ApiInterface";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import Avatar from "../../public/logo.png";
import Link from "next/link";

const Cards: React.FC<blog> = ({ image, title, date_posted, id }) => {
	return (
		<div className="bg-base-200 shadow-[0_.2rem_.7rem_0px_rgba(0,0,0,0.7)] rounded-sm flex flex-col">
			<div className="avatar p-3 flex items-center gap-2">
				<div className="rounded-3xl">
					<Image src={Avatar} width={35} height={35} />
				</div>
				<h1>Username</h1>
			</div>
			<Link href={`/post/${id}`}>
				<a>
					<Image src={image} width={300} height={300} />
					<div className="p-2">
						<h1 className="font-bold text-2xl">{title}</h1>
						<h1 className="text-sm italic">{date_posted.split("T")[0]}</h1>
					</div>
					<div className="divider p-0 m-0"></div>
				</a>
			</Link>
			<div className="pb-1 flex justify-end mr-2">
				<button className="btn btn-ghost text-xl">
					<BsBookmarkPlus />
				</button>
				<button className="btn btn-ghost text-xl">
					<AiOutlineHeart />
				</button>
			</div>
		</div>
	);
};

export default Cards;
