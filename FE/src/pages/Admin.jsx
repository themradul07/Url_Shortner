import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/get/all`)
            .then(res => setUrls(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

            <div className="overflow-x-auto">
                {urls.length == 0 ? "There are currently no links in the database" :
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">Short URL</th>
                                <th className="px-4 py-2 border">Original URL</th>
                                <th className="px-4 py-2 border">Clicks</th>
                                <th className="px-4 py-2 border">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urls.length == 0 && "Nothing to Show here"}
                            {urls.map((url) => (
                                <tr key={url._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border text-blue-600 hover:underline break-all">
                                        <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                                            {url.shortUrl}
                                        </a>
                                    </td>
                                    <td className="px-4 py-2 border break-all">{url.originalUrl}</td>
                                    <td className="px-4 py-2 border text-center">{url.click}</td>
                                    <td className="px-4 py-2 border">
                                        {new Date(url.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}
