"use client"

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export type Post = {
    id: string;
    content: string;
    created_at: string;
    image_url?: string;
    parent_post_id?: string;
    user_id: string;
    profiles?: {
        username: string;
        avatar_url: string | null;
    };
};

export function usePosts() {
    const supabase = createClient();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();

        const channel = supabase
        .channel('posts')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'posts' },
            () => {
                fetchPosts();
            }
        )
        .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("posts")
            .select("*, profiles(username, avatar_url)")
            .order("created_at", { ascending: false })
            .limit(50);
        if (!error) setPosts(data || []);
        setLoading(false);
    };

    const createPost = async ({
        content,
        image_url,
        parent_post_id
    }: {
        content: string;
        image_url?: string;
        parent_post_id?: string;
    }) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Not logged in");

        const { error } = await supabase.from("posts").insert({
            content,
            user_id: user.id,
            image_url,
            parent_post_id
        });
        if (error) throw error;

        fetchPosts();
    };

    const updatePost = async (
        id: string,
        updates: Partial<{ content: string; image_url: string }>
    ) => {
        const { error } = await supabase.from("posts").update(updates).eq("id", id);
        if (error) throw error;
        fetchPosts();
    };

    const deletePost = async (id: string) => {
        const { error } = await supabase.from("posts").delete().eq("id", id);
        if (error) throw error;
        fetchPosts();
    };

    return {
        posts,
        loading,
        createPost,
        updatePost,
        deletePost
    };
}
