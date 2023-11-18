'use client'

import { CommentType } from "@/app/utils/CommentType";
import { PostType } from "@/app/utils/PostType";
import { useState } from "react";
import useSWR from "swr";

export const revalidate = 1800; // Revalida a páginda a cada 30min

export default function Posts() {
    const [ srcPost, setSrcPost ] = useState('')
    const URL = 'https://jsonplaceholder.typicode.com'
    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const { data: posts, error: postsError, isLoading: postsLoading } = useSWR<PostType[]>(`${URL}/posts`, fetcher)
    const { data: comments, error: commentsError, isLoading: commentsLoading } = useSWR<CommentType[]>(`${URL}/comments`, fetcher)
    const filteredPosts = posts?.filter(post => post.title.toLocaleLowerCase().includes(srcPost.toLocaleLowerCase()))
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
            </div>
        </>
    )
}