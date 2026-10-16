import type { ArticleBlock } from "./types";
import { CodeBlock } from "./CodeBlock";
import styles from "./blog.module.css";

export function ArticleBody({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph": return <p>{block.text}</p>;
    case "list": return block.ordered ? <ol>{block.items.map((item) => <li key={item}>{item}</li>)}</ol> : <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    case "note": return <aside className={styles.note}><strong>{block.title}</strong><p>{block.text}</p></aside>;
    case "code": return <CodeBlock block={block} />;
    case "table": return (
      <div className={styles.tableScroll} role="region" aria-label={block.caption} tabIndex={0}>
        <table><caption>{block.caption}</caption><thead><tr>{block.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
          <tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }
}
