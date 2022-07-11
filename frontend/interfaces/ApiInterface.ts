export type postData = {
	title: string;
	body: string;
	image: string;
	image_key: string;
};

export type blogData = [
	{
		id: number;
		title: string;
		body: string;
		image_url: string;
		image_key: string;
		date_posted: string;
	}
];

export interface blog {
	id: number;
	title: string;
	body: string;
	image_url: string;
	image_key: string;
	date_posted: string;
}
