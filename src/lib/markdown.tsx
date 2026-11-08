import React from "react";

// Tiny markdown-subset renderer. Safe by construction: it builds React elements
// and never uses innerHTML. Links are restricted to http(s), mailto and relative URLs.

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

function parse(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let buffer: string[] = [];
  let list: string[] = [];
  let listType: "ul" | "ol" = "ul";

  const flushParagraph = () => {
    if (buffer.length) {
      blocks.push({ type: "p", text: buffer.join(" ").trim() });
      buffer = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: listType, items: list });
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();
    if (trimmed === "") {
      flushParagraph();
      flushList();
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", text: line.slice(4) });
    } else if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", text: line.slice(3) });
    } else if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", text: line.slice(2) });
    } else if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "quote", text: line.slice(2) });
    } else if (/^[-*] /.test(trimmed)) {
      flushParagraph();
      if (listType !== "ul") flushList();
      listType = "ul";
      list.push(trimmed.slice(2));
    } else if (/^\d+\. /.test(trimmed)) {
      flushParagraph();
      if (listType !== "ol") flushList();
      listType = "ol";
      list.push(trimmed.replace(/^\d+\. /, ""));
    } else {
      flushList();
      buffer.push(trimmed);
    }
  }
  flushParagraph();
  flushList();
  return blocks;
}

function safeHref(href: string): string | null {
  if (/^(https?:\/\/|mailto:|\/|#)/i.test(href)) return href;
  return null;
}

function inline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("**")) nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    else if (token.startsWith("`")) nodes.push(<code key={key++}>{token.slice(1, -1)}</code>);
    else if (token.startsWith("*")) nodes.push(<em key={key++}>{token.slice(1, -1)}</em>);
    else {
      const m = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const href = m ? safeHref(m[2]) : null;
      if (m && href) nodes.push(<a key={key++} href={href}>{m[1]}</a>);
      else if (m) nodes.push(m[1]);
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function renderMarkdown(source: string) {
  const blocks = parse(source);
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "h2") return <h2 key={i}>{inline(b.text)}</h2>;
        if (b.type === "h3") return <h3 key={i}>{inline(b.text)}</h3>;
        if (b.type === "p") return <p key={i}>{inline(b.text)}</p>;
        if (b.type === "quote") return <blockquote key={i}>{inline(b.text)}</blockquote>;
        const Tag = b.type;
        return (
          <Tag key={i}>
            {b.items.map((it, j) => (
              <li key={j}>{inline(it)}</li>
            ))}
          </Tag>
        );
      })}
    </>
  );
}
