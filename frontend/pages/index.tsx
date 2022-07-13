import type { GetServerSideProps, NextPage } from "next";
import { dehydrate, DehydratedState, QueryClient } from "react-query";
import Cards from "../components/Card";
import Spinner from "../components/Spinner";
import { getBlogs, useBlog } from "../hooks/usePost";
import { GrRefresh } from "react-icons/gr";

const Home: NextPage = () => {
	const { data, isLoading, isSuccess, isError, refetch } = useBlog();

	return (
		<div className="flex justify-center items-center">
			{isLoading && <Spinner />}
			<div className="flex gap-5 p-5 flex-col lg:flex-row flex-wrap justify-center">
				{isSuccess &&
					data.map((blog) => (
						<Cards
							title={blog.title}
							body={blog.body}
							image_url={blog.image_url}
							image_key={blog.image_key}
							date_posted={blog.date_posted}
							id={blog.id}
							key={blog.id}
						/>
					))}
			</div>
			{isError && (
				<div className="flex justify-center flex-col items-center">
					<button className="btn btn-ghost text-5xl text-base-300" onClick={() => refetch()}>
						<GrRefresh />
					</button>
					<h1>Something went wrong.Try again</h1>
				</div>
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (): Promise<{
	props: { dehydratedState: DehydratedState };
}> => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery("blogs", getBlogs);

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
		},
	};
};

export default Home;
