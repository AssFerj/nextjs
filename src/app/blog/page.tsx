import GetPosts from "@/components/GetPosts";
import { Pagination } from "@/components/Pagination";

export default function Blog() {
    return (
      <main className="flex flex-col items-center justify-between p-24">
        <h1 className="mb-5">Blog</h1>
        <GetPosts/>
      </main>
    )
  }