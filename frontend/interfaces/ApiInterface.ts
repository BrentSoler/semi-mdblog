export type postData = {
	title: string;
	body: string;
	image: string;
	image_key: string;
};

export interface postMutate {
	data: postData;
}
