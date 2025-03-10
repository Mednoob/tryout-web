import remarkGfm from "remark-gfm";
import MD from "react-markdown";

export const Markdown = ({ children }: { children: string }) => {
  return <div className="reset-all">
    <MD remarkPlugins={[remarkGfm]}>{children}</MD>
  </div>;
};
