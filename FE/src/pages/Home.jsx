import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from 'sonner'

export default function UrlShortenerForm() {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [LinksArray, setLinksArray] = useState([]);

    const notify = (msg) => {
        toast.success(msg);


    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShortUrl("");
        setError("");
        setCopied(false);
        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shorten`, {
                originalUrl: longUrl,
            });
            notify("Shortened Successfully")
            console.log(res.data);
            setShortUrl(res.data.shortenUrl);
        } catch (err) {
            if (err.response) {
                setError(
                    `Error ${err.response.status}: ${err.response.data?.message || "Failed to shorten URL"
                    }`
                );
            } else if (err.request) {
                setError("No response from server. Check your connection.");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <>
        <div className="max-w-screen overflow-hidden">

        
            <Toaster/>
            <div className="inset-0 -z-10 min-h-screen w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] fill-green-200 bg-[size:6rem_4rem]">
  <div className="container max-w-full md:max-w-[65vw] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col py-8 gap-5 text-center">
      
      {/* Logo + Heading */}
      <div className="text-black">
        <div className="logo font-bold text-2xl">
          <span className="text-green-600">&lt;</span>
          Light
          <span className="text-green-600">Link/&gt;</span>
        </div>
        <p className="font-semibold text-lg">Compress the lengthy</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white shadow-lg p-4 rounded-2xl border border-gray-200 w-full max-w-2xl mx-auto"
      >
        <input
          type="url"
          placeholder="Paste your long URL here..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
          className="flex-1 p-3 text-gray-700 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className={`px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 shadow-md w-full sm:w-auto ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 active:scale-95"
          }`}
        >
          Shorten
        </button>
      </form>

      {/* Error */}
      {error && <p className="text-red-500 mt-2 text-sm sm:text-base">{error}</p>}

      {/* Short URL Display */}
      {shortUrl && (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm space-y-2 w-full max-w-2xl mx-auto">
          <p className="text-gray-700 font-medium">Shortened URL:</p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-blue-600 font-medium hover:underline break-words"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full sm:w-auto ${
                copied
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
</div>



        </>
    );
}
