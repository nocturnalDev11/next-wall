import { useUserProfile } from "@/hooks/useUser";
import Card from "@/components/ui/Card";

export default function ProfileContainer() {
    const { profile, loading } = useUserProfile();

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (!profile) {
        return <div>No profile found.</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Card
                header="Profile"
                footer="Last updated just now"
            >
                <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
                <div className="text-lg">ID: {profile.id}</div>
                <div className="text-lg">Username: {profile.username || "(no username yet)"}</div>
                <div className="text-lg">Email: {profile.email}</div>
                <div className="text-lg">Bio: {profile.bio || "(no bio yet)"}</div>
                <div className="text-lg">Avatar: {profile.avatar_url || "(no avatar yet)"}</div>
            </Card>
        </div>
    );
}
