import Link from "next/link";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { LayoutProps } from "../../interfaces/FcInterface";

const NavBar: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="drawer drawer-end">
			<input id="nav" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content w-full ">
				<div className="flex justify-between shadow-lg items-center font-semibold font-xl z-50">
					<div className="flex gap-5 items-center m-4 font-bold ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-10 w-10"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
							/>
						</svg>
						<h1 className="text-3xl">Blog</h1>
					</div>
					<label htmlFor="nav" className="drawer-button sm:hidden mr-4 text-3xl">
						<AiOutlineMenu />
					</label>

					<ul className="sm:flex gap-3 mr-4 hidden">
						<Link href="/">
							<a>Create</a>
						</Link>
					</ul>
				</div>
				{children}
			</div>
			<div className="drawer-side">
				<label htmlFor="nav" className="drawer-overlay"></label>
				<ul className="menu p-4 overflow-y-auto w-[50%] bg-base-100 font-semibold text-2xl flex flex-col justify-center">
					<Link href="/">
						<a>Create</a>
					</Link>
				</ul>
			</div>
		</div>
	);
};

export default NavBar;
