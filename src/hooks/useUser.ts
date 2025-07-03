"use client"

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export function useUserProfile() {
    const supabase = createClient();
    const [profile, setProfile] = useState<{
        id: string;
        username: string;
        email: string;
        avatar_url: string | null;
        bio: string | null;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getSessionUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                const { data: profileData, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();
                // if (!error)
                //     setProfile(data);
                if (!error) {
                    setProfile({
                        ...profileData,
                        email: user.email
                    });
                }
            }
            setLoading(false);
        };
        getSessionUser();
    }, []);

    const updateProfile = async (updates: Partial<{ username: string; avatar_url: string; bio: string }>) => {
        if (!user) return;
        const { error } = await supabase.from("profiles").upsert({
            id: user.id,
            ...updates,
        });
        if (error) throw error;
        setProfile({ ...profile!, ...updates });
    };

    return { profile, updateProfile, loading, user };
}
