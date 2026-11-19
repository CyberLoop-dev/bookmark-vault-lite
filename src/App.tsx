import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

type Bookmark = { id: string; title: string; url: string; tags: string[]; addedAt: number };
const KEY = "bookmark-vault-lite-v1";
const escapeHtml = (value: string) => value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
function readSaved(): Bookmark[] {
  try { const value = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(value) ? value : []; }
  catch { return []; }
}
function importHtml(source: string): Bookmark[] {
  const doc = new DOMParser().parseFromString(source, "text/html");
  return Array.from(doc.querySelectorAll<HTMLAnchorElement>("a[href]")).map((a, i) => ({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()+i),
    title: (a.textContent || a.href).trim() || a.href,
    url: a.href, tags: [], addedAt: Date.now()
  })).filter(x => /^https?:/i.test(x.url));
}
export default function App() {
  const [items,setItems] = useState<Bookmark[]>(readSaved);
  const [query,setQuery] = useState("");
  const [title,setTitle] = useState("");
  const [url,setUrl] = useState("");
  const [tags,setTags] = useState("");
  const [notice,setNotice] = useState("Your collection stays on this device.");
  useEffect(() => { localStorage.setItem(KEY,JSON.stringify(items)); },[items]);
  const visible = useMemo(() => items.filter(x => [x.title,x.url,...x.tags].join(" ").toLowerCase().includes(query.toLowerCase())),[items,query]);
  function add(e: FormEvent) {
    e.preventDefault();
    try {
      const parsed = new URL(url);
      if (!["http:","https:"].includes(parsed.protocol)) throw new Error("Only HTTP and HTTPS links are supported.");
      if (items.some(x => x.url === parsed.href)) { setNotice("That URL is already saved."); return; }
      setItems(prev => [{id:crypto.randomUUID(),title:title.trim() || parsed.hostname,url:parsed.href,tags:tags.split(",").map(x=>x.trim()).filter(Boolean),addedAt:Date.now()},...prev]);
      setTitle(""); setUrl(""); setTags(""); setNotice("Bookmark saved locally.");
    } catch { setNotice("Enter a valid HTTP or HTTPS URL."); }
  }
  async function onImport(e: ChangeEvent<HTMLInputElement>) {
    const file=e.target.files?.[0]; if(!file) return;
    const incoming=importHtml(await file.text());
    setItems(prev => { const known=new Set(prev.map(x=>x.url)); return [...prev,...incoming.filter(x=>!known.has(x.url))]; });
    setNotice(`Imported ${incoming.length} links (existing URLs are kept once).`); e.target.value="";
  }
  function exportHtml() {
    const rows=items.map(x=>`<dt><a href="${escapeHtml(x.url)}" add_date="${x.addedAt}">${escapeHtml(x.title)}</a></dt>`).join("\n");
    const blob=new Blob([`<!DOCTYPE NETSCAPE-Bookmark-file-1><html><meta charset="utf-8"><title>Bookmarks</title><body><h1>Bookmarks</h1><dl><p>${rows}</p></dl></body></html>`],{type:"text/html"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="bookmarks.html";a.click();URL.revokeObjectURL(a.href);
  }
  return <main className="shell">
    <header className="hero"><div><span className="eyebrow">LOCAL COLLECTION / NO ACCOUNT</span><h1>Bookmark <em>Vault</em></h1><p>Keep useful links close. Search, tag, import and export — all on this device.</p></div><div className="heroMark">BV<span>↗</span></div></header>
    <section className="toolbar"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search titles, URLs or tags…" aria-label="Search bookmarks"/><label className="button secondary">Import HTML<input hidden type="file" accept=".html,.htm,text/html" onChange={onImport}/></label><button className="button secondary" onClick={exportHtml} disabled={!items.length}>Export</button></section>
    <form className="addForm" onSubmit={add}><h2>Add a bookmark</h2><div className="formGrid"><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title (optional)"/><input required type="url" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.com"/><input value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags, separated by commas"/><button className="button primary">Save link</button></div><p className="notice" role="status">{notice}</p></form>
    <section className="listHead"><h2>Your collection</h2><span>{visible.length} / {items.length} links</span></section>
    <section className="cards">{visible.map(x=><article className="bookmark" key={x.id}><div className="favicon">{x.title.slice(0,1).toUpperCase()}</div><div className="bookmarkBody"><h3>{x.title}</h3><a href={x.url} target="_blank" rel="noreferrer">{new URL(x.url).hostname}</a><p>{x.url}</p><div className="tags">{x.tags.map(t=><span key={t}>{t}</span>)}</div></div><button className="remove" aria-label={`Remove ${x.title}`} onClick={()=>setItems(prev=>prev.filter(y=>y.id!==x.id))}>×</button></article>)}</section>
    {!visible.length && <div className="empty"><strong>{items.length ? "No matching bookmarks" : "Your vault is ready"}</strong><p>{items.length ? "Try another search." : "Import a browser export or add your first link above."}</p></div>}
    <footer>Stored in localStorage · Export regularly to keep a backup</footer>
  </main>;
}
