import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MarkdownProps } from "../../interfaces/FcInterface";

const Markdown: React.FC<MarkdownProps> = ({ body }) => {
	return <ReactMarkdown children={body} remarkPlugins={[remarkGfm]} />;
};

export default Markdown;
