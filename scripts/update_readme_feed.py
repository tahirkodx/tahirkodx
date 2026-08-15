#!/usr/bin/env python3
"""Refresh the Quote and Latest-from-the-web blocks in README.md.

Uses only the stdlib. Free sources:
- Famous quotes: github-readme-quotes (SVG) + ZenQuotes API (markdown)
- News: Hacker News Algolia + BBC Technology RSS
"""

from __future__ import annotations

import json
import re
import ssl
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from html import escape, unescape
from pathlib import Path
from urllib.parse import urlparse, urlunparse

ROOT = Path(__file__).resolve().parents[1]
README = ROOT / "README.md"

QUOTE_START = "<!--FEED:QUOTE:START-->"
QUOTE_END = "<!--FEED:QUOTE:END-->"
NEWS_START = "<!--FEED:NEWS:START-->"
NEWS_END = "<!--FEED:NEWS:END-->"

QUOTE_SVG = (
    "https://github-readme-quotes-bay.vercel.app/quote"
    "?theme=tokyonight&quoteCategory=general&refresh={ts}"
)
ZENQUOTES = "https://zenquotes.io/api/random"
HN = "https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=6"
BBC_RSS = "https://feeds.bbci.co.uk/news/technology/rss.xml"

CTX = ssl.create_default_context()
UA = "tahirkodx-readme-feed/1.0 (+https://github.com/tahirkodx/tahirkodx)"
EMDASHES = dict.fromkeys(map(ord, "\u2014\u2013\u2015\u2212"), None)


def fetch(url: str, timeout: int = 20) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urllib.request.urlopen(req, context=CTX, timeout=timeout) as res:
        return res.read()


def strip_tracking(url: str) -> str:
    parsed = urlparse(url)
    return urlunparse(parsed._replace(query="", fragment=""))


def no_emdash(value: str) -> str:
    cleaned = value.translate(EMDASHES)
    cleaned = cleaned.replace(" - ", ", ")
    return cleaned


def strip_tags(value: str) -> str:
    text = re.sub(r"<[^>]+>", " ", value)
    text = unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def clip(value: str, limit: int = 150) -> str:
    text = no_emdash(strip_tags(value))
    if len(text) <= limit:
        return text
    cut = text[: limit].rsplit(" ", 1)[0].rstrip(".,;:")
    return f"{cut}."


def fetch_quote() -> tuple[str, str]:
    try:
        data = json.loads(fetch(ZENQUOTES).decode("utf-8"))
        item = data[0] if isinstance(data, list) else data
        text = no_emdash(unescape(str(item.get("q") or "")).strip())
        author = no_emdash(unescape(str(item.get("a") or "Unknown")).strip())
        if text:
            return text, author
    except Exception as exc:  # keep README update going
        print(f"zenquotes fallback: {exc}")
    return (
        "The details are not the details. They make the design.",
        "Charles Eames",
    )


def fetch_hn(limit: int = 3) -> list[tuple[str, str, str, str]]:
    out: list[tuple[str, str, str, str]] = []
    try:
        payload = json.loads(fetch(HN).decode("utf-8"))
        for hit in payload.get("hits") or []:
            title = no_emdash((hit.get("title") or "").strip())
            if not title:
                continue
            url = (hit.get("url") or "").strip()
            if not url:
                oid = hit.get("objectID")
                url = f"https://news.ycombinator.com/item?id={oid}"
            points = hit.get("points")
            comments = hit.get("num_comments")
            author = hit.get("author") or "unknown"
            story = clip(hit.get("story_text") or "")
            host = urlparse(url).netloc.replace("www.", "")
            if story:
                dek = story
            elif "ycombinator.com" in host:
                dek = (
                    f"A Hacker News thread. {points} points and {comments} comments, "
                    f"posted by {author}."
                )
            else:
                dek = (
                    f"From {host}. {points} points on Hacker News, {comments} comments. "
                    f"Posted by {author}."
                )
            out.append(("Hacker News", title, dek, url))
            if len(out) >= limit:
                break
    except Exception as exc:
        print(f"hn fetch failed: {exc}")
    return out


def fetch_bbc(limit: int = 3) -> list[tuple[str, str, str, str]]:
    out: list[tuple[str, str, str, str]] = []
    try:
        root = ET.fromstring(fetch(BBC_RSS))
        for item in root.findall(".//item"):
            title = no_emdash(unescape((item.findtext("title") or "").strip()))
            link = strip_tracking((item.findtext("link") or "").strip())
            raw_desc = item.findtext("description") or ""
            dek = clip(raw_desc) or "A BBC Technology brief. Open the piece for the rest."
            if not title or not link:
                continue
            out.append(("BBC Technology", title, dek, link))
            if len(out) >= limit:
                break
    except Exception as exc:
        print(f"bbc fetch failed: {exc}")
    return out


def replace_block(text: str, start: str, end: str, inner: str) -> str:
    pattern = re.compile(
        re.escape(start) + r".*?" + re.escape(end),
        flags=re.DOTALL,
    )
    replacement = f"{start}\n{inner.rstrip()}\n{end}"
    if not pattern.search(text):
        raise SystemExit(f"missing markers {start} ... {end}")
    return pattern.sub(replacement, text, count=1)


def html_text(value: str) -> str:
    return escape(no_emdash(value), quote=False)


def html_attr(value: str) -> str:
    return escape(no_emdash(value), quote=True)


def build_quote_block(ts: str, quote: str, author: str) -> str:
    src = QUOTE_SVG.format(ts=ts)
    return (
        f'<p align="center">\n'
        f'  <img src="{src}" alt="Famous quote" width="100%">\n'
        f"</p>\n"
        f"\n"
        f"> {no_emdash(quote)}\n"
        f">\n"
        f"> {no_emdash(author)}\n"
        f"\n"
        f"<sub>Card via github-readme-quotes. Line via ZenQuotes. Both refresh on a schedule.</sub>"
    )


def news_card(source: str, title: str, dek: str, url: str) -> str:
    return (
        '    <td width="50%" valign="top">\n'
        f"      <p><strong>{html_text(source)}</strong></p>\n"
        f'      <h3><a href="{html_attr(url)}">{html_text(title)}</a></h3>\n'
        f"      <p>{html_text(dek)}</p>\n"
        "    </td>"
    )


def build_news_block(rows: list[tuple[str, str, str, str]], stamped: str) -> str:
    if not rows:
        return f"_Feed is quiet right now. Last attempt {stamped}._"
    chunks = ["<table>"]
    for i in range(0, len(rows), 2):
        pair = rows[i : i + 2]
        chunks.append("  <tr>")
        chunks.append(news_card(*pair[0]))
        if len(pair) == 2:
            chunks.append(news_card(*pair[1]))
        else:
            chunks.append('    <td width="50%" valign="top"></td>')
        chunks.append("  </tr>")
    chunks.append("</table>")
    chunks.append("")
    chunks.append(
        f"<sub>Updated {stamped}. Hacker News front page + BBC Technology RSS.</sub>"
    )
    return "\n".join(chunks)


def main() -> None:
    readme = README.read_text(encoding="utf-8")
    now = datetime.now(timezone.utc)
    ts = str(int(now.timestamp()))
    stamped = now.strftime("%d %b %Y, %H:%M UTC")

    quote, author = fetch_quote()
    hn_rows = fetch_hn(3)
    bbc_rows = fetch_bbc(3)
    news: list[tuple[str, str, str, str]] = []
    for left, right in zip(hn_rows, bbc_rows):
        news.extend([left, right])
    leftover = hn_rows[len(bbc_rows) :] or bbc_rows[len(hn_rows) :]
    news.extend(leftover)

    readme = replace_block(readme, QUOTE_START, QUOTE_END, build_quote_block(ts, quote, author))
    readme = replace_block(readme, NEWS_START, NEWS_END, build_news_block(news, stamped))
    README.write_text(readme, encoding="utf-8")
    print(f"updated quote ({author}) and {len(news)} headlines")


if __name__ == "__main__":
    main()
