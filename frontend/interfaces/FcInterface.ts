import { ChangeEvent, ChangeEventHandler, FormEvent } from "react";

export interface LayoutProps {
	children: JSX.Element;
}

export type formData = {
	title: string;
	body: string;
};

export interface PostPageProps {
	formData: formData;
	image_base64: string | undefined;
	onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
	onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export interface PreviewProps {
	formData: formData;
	image_base64: string | undefined;
	state: boolean;
}

export interface MarkdownProps {
	body: string;
}
