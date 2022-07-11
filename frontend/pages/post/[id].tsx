import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { dehydrate, DehydratedState, QueryClient } from "react-query";
import Markdown from "../../components/Markdown";
import { getBlogsByID, useBlogById } from "../../hooks/usePost";

const Post = ({ param }: { param: ParsedUrlQuery | undefined }) => {
	const id = param!.id;
	const { data } = useBlogById(id);

	return (
		<div className={`block sm:w-screenprose pb-5 mx-auto`}>
			<div className="flex justify-center w-full mx-auto">
				{/* <Image src={} className="-z-10" width={900} height={800} /> */}
			</div>
			<div className="mt-5 mb-6 w-screen text-center sm:text-left">
				<h1 className="m-0 text-5xl">{id?.toString()}</h1>
				<p className="m-0 italic">Date Posted</p>
			</div>
			<div className="mx-3 md:mx-0 break-words">{/* <Markdown body={} /> */}</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	params,
}): Promise<{
	props: { dehydratedState: DehydratedState; param: ParsedUrlQuery | undefined };
}> => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery("blogsbyid", () => getBlogsByID(params!.id));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			param: params,
		},
	};
};

export default Post;
