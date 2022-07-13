import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Avatar from "../../public/logo.png";
import { GrRefresh } from "react-icons/gr";
import { dehydrate, DehydratedState, QueryClient } from "react-query";
import Markdown from "../../components/Markdown";
import Spinner from "../../components/Spinner";
import { getBlogsByID, useBlogById } from "../../hooks/usePost";

const Post = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess, isLoading, isError, refetch } = useBlogById(id);

	return (
		<>
			{isLoading && <Spinner />}
			{isSuccess && (
				<div className="flex flex-col w-[60vw] pb-5 mx-auto overflow-hidden">
					<div className="mt-5 mb-6 w-full text-center sm:text-left prose">
						<div className="avatar flex items-center gap-2">
							<div className="rounded-3xl">
								<Image src={Avatar} width={45} height={45} />
							</div>
							<p className="text-lg">Username</p>
						</div>
						<h1 className="m-0 text-5xl">{data.title}</h1>
						<p className="m-0 italic">{data.date_posted.split("T")[0]}</p>
					</div>

					<div className="w-[80%] flex justify-center self-center">
						<Image src={data.image_url} width={900} height={500} priority />
					</div>

					<div className="divider"></div>

					<div className="mx-3 md:mx-0 break-words prose">
						<Markdown body={data.body} />
					</div>
				</div>
			)}
			{isError && (
				<div className="flex justify-center flex-col items-center">
					<button className="btn btn-ghost text-5xl text-base-300" onClick={() => refetch()}>
						<GrRefresh />
					</button>
					<h1>Something went wrong.Try again</h1>
				</div>
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	params,
}): Promise<{
	props: { dehydratedState: DehydratedState };
}> => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery("blogsbyid", () => getBlogsByID(params!.id));

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
		},
	};
};

export default Post;
