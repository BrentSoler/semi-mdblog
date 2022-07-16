declare namespace Express {
	export interface Request {
		user: Users | undefined | null;
	}
}

type Users = {
	id: number;
	name: string;
	email: string;
	password: string;
	image_key: string;
	image_url: string;
};
