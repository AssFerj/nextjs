'use client'

import { CommentType } from "@/app/utils/CommentType";
import { PostType } from "@/app/utils/PostType";
import { useState } from "react";
import useSWR from "swr";

const revalidate = 1800; // Revalidate page on 30min
const postsPerPage = 8; // Number of posts per page
const apiMaxPosts = 100; // Maximum number of posts from the API

export default function Posts() {
    // State Variables 
    const [srcPost, setSrcPost] = useState('')
    const [offset, setOffset] = useState(0);

    // Variables to fetch data
    const URL = 'https://jsonplaceholder.typicode.com'
    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const { data: posts, error: postsError, isLoading: postsLoading } = useSWR<PostType[]>(`${URL}/posts?_start=${offset}&_limit=${postsPerPage}`, fetcher)
    const { data: comments, error: commentsError, isLoading: commentsLoading } = useSWR<CommentType[]>(`${URL}/comments`, fetcher)
    
    // Variables to filter posts
    const filteredPosts = posts?.filter(post => post.title.toLocaleLowerCase().includes(srcPost.toLocaleLowerCase()))
    
    // Variables to create pagination
    const MAX_ITEMS = 9;
    const MAX_LEFT = (MAX_ITEMS - 1) / 2;
    const current = offset ? Math.floor(offset / postsPerPage) + 1 : 1;
    const pages = Math.ceil((filteredPosts?.length ?? 0) / postsPerPage);
    const firstBtn = Math.max(current - MAX_LEFT, 1);

    const handlePageClick = (page: number) => {
        setOffset((page - 1) * postsPerPage);
    };

    return (
        <>
            <h2 className="my-5">Our Posts</h2>
            <div className="flex flex-col items-center justify-around flex-wrap w-100">
                <div>
                    <input type="text" placeholder="Search Post" className="input input-bordered w-full max-w-xs" value={srcPost} onChange={e => setSrcPost(e.target.value)} />
                </div>
                <div className="flex flex-row items-center justify-around flex-wrap w-100">
                    {
                        !commentsLoading && comments && filteredPosts && (
                            filteredPosts.map((post) => {
                                const postComments = comments.filter(comment => comment.postId === post.id);
                                
                                return (
                                    <div key={post.id} className="card w-80 h-96 mt-5 mr-2 bg-primary text-primary-content">
                                        <div className="card-body">
                                            <h2 className="card-title">{post.title.toLocaleUpperCase()}</h2>
                                            <p>{post.body}</p>
                                            <p>Comments: {postComments.length}</p>
                                        </div>
                                    </div>
                                );
                            })
                        )
                    }
                </div>
                <ul className="join mt-5">
                    {
                        Array.from({ length: Math.ceil(apiMaxPosts / postsPerPage) }).map((_, index) => {
                            const page = index + 1;
                            return (
                              <li key={page}>
                                <button
                                  className={`join-item btn ${page === current ? 'btn-disabled' : ''}`}
                                  onClick={() => handlePageClick(page)}
                                >
                                  {page}
                                </button>
                              </li>
                            );
                        })
                    }
                </ul>
            </div>
        </>
    )
}