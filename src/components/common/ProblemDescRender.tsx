import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export default function ProblemDescRender({
  children,
  isHeadingHidden,
}: {
  children: string;
  isHeadingHidden: boolean;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ children }) => (
          <h1
            className={`h3 mb-[30px] font-semibold ${isHeadingHidden && 'hidden'}`}
          >
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2
            className={`h4 mb-[26px] font-semibold underline decoration-[var(--color-sub1)] decoration-[2.5px] underline-offset-8 ${isHeadingHidden && 'hidden'}`}
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="h5 mb-[22px] font-semibold">{children}</h3>
        ),
        p: ({ children }) => <p className="mb-[14px]">{children}</p>,
        ul: ({ children }) => <ul className="mb-[14px]">{children}</ul>,
        ol: ({ children }) => <ol className="mb-[14px]">{children}</ol>,
        strong: ({ children }) => (
          <strong className="block font-semibold text-[var(--color-main)]">
            {children}
          </strong>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
