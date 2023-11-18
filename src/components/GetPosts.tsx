'use client'

import { CommentType } from "@/app/utils/CommentType";
import { PostType } from "@/app/utils/PostType";
import useSWR from "swr";

export default function Posts() {
    const URL = 'https://jsonplaceholder.typicode.com'
    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const { data: posts, error: postsError, isLoading: postsLoading } = useSWR<PostType[]>(`${URL}/posts`, fetcher)
    const { data: comments, error: commentsError, isLoading: commentsLoading } = useSWR<CommentType[]>(`${URL}/comments`, fetcher)
    return (
        <>
            <h2>Nossos Posts</h2>
            <div className="flex flex-row items-center justify-between flex-wrap">
                {
                    !postsLoading && posts && !commentsLoading && comments && (
                        posts.map((post) => {
                            const postComments = comments.filter(comment => comment.postId === post.id);
                            
                            return (
                                <div key={post.id} className="card w-96 h-96 mt-5 mr-2 bg-primary text-primary-content">
                                    <div className="card-body">
                                        <h2 className="card-title">{post.title}</h2>
                                        <p>{post.body}</p>
                                        <p>Comentários: {postComments.length}</p>
                                        {/* <div className="card-actions justify-end">
                                            <button className="btn">Read More</button>
                                        </div> */}
                                    </div>
                                </div>
                            );
                        })
                    )
                }
            </div>
        </>
    )
}