import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRef } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = useRef(new QueryClient());

	return (
		<QueryClientProvider client={queryClient.current}>
			<Hydrate state={pageProps.dehydratedState}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
				{process.env.NEXT_PUBLIC_NODE_ENV === "dev" ? <ReactQueryDevtools /> : <></>}
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
