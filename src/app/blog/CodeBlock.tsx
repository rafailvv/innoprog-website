import type { ReactNode } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-sql";
import { CopyCodeButton } from "./CopyCodeButton";
import type { ArticleBlock } from "./types";
import styles from "./blog.module.css";

// Tokenize on the server: article text stays in HTML, the highlighter is not sent to the browser.
function renderToken(token: string | Prism.Token, key: number): ReactNode {
  if (typeof token === "string") return token;
  const content = Array.isArray(token.content) ? token.content : [token.content];
  const aliases = typeof token.alias === "string" ? [token.alias] : token.alias ?? [];
  return <span className={["token", token.type, ...aliases].join(" ")} key={key}>{content.map(renderToken)}</span>;
}

export function CodeBlock({ block }: { block: Extract<ArticleBlock, { type: "code" }> }) {
  const tokens = block.language === "text" ? [block.code] : Prism.tokenize(block.code, Prism.languages[block.language]);
  return <figure className={styles.codeBlock}>
    <div className={styles.codeToolbar}><span className={styles.codeLanguage}>{block.language === "text" ? "Текст" : block.language}</span><CopyCodeButton code={block.code} caption={block.caption} /></div>
    <pre tabIndex={0} aria-label={block.caption}><code className={`language-${block.language}`}>{tokens.map(renderToken)}</code></pre>
    <figcaption>{block.caption}</figcaption>
  </figure>;
}
