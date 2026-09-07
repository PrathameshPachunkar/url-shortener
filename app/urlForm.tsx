"use client";

import { FormEvent, useState } from "react";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Send URL to your API
    console.log("URL:", url);

    // Temporary result for UI testing
    setShortUrl("https://short.ly/abc123");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Shorten your URL
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Create a short, shareable link in seconds.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-2xl sm:flex-row"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/your-long-url"
            required
            className="min-w-0 flex-1 rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-white/20"
          />

          <button
            type="submit"
            className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 active:scale-[0.98]"
          >
            Shorten
          </button>
        </form>

        {shortUrl && (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
            <div className="min-w-0">
              <p className="text-xs text-zinc-500">Your shortened URL</p>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate text-sm text-white hover:underline"
              >
                {shortUrl}
              </a>
            </div>

            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              className="shrink-0 rounded-lg border border-zinc-700 px-3 py-2 text-xs text-zinc-300 transition hover:bg-zinc-800"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
