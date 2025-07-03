'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        console.error("Supabase login error:", error.message);
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/home')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: signUpData, error } = await supabase.auth.signUp(data)

    if (error) {
        console.error("signup error", error.message)
        redirect('/error')
    }

    const userId = signUpData.user?.id;
    if (!userId) {
        console.warn("No user id returned from signUp — email confirmation likely required.");
        redirect('/auth/verify');
        return;
    }

    const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        username: null,
        avatar_url: null,
        bio: null
    });
    if (profileError) {
        console.error("profiles insert error", profileError.message)
    }

    revalidatePath('/', 'layout')
    redirect('/profile')
}

