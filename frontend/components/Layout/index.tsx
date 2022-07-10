import React from "react";
import { LayoutProps } from "../../interfaces/FcInterface";
import { Theme } from "react-daisyui";
import HeadComp from "../HeadComp";
import NavBar from "../NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
	return (
		<Theme dataTheme="light">
			<HeadComp />
			<div className="font-pop">
				<NavBar>{children}</NavBar>
				<ToastContainer position="bottom-right" theme="dark" />
			</div>
		</Theme>
	);
};

export default Layout;
