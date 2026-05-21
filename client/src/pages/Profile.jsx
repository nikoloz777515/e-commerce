import { useAuth } from "../hooks/useAuth";

const Profile = () => {
    const { user } = useAuth();

    return (
        <section className="mx-auto max-w-xl rounded-4xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-300/30 sm:p-10">
            <h2 className="mb-6 text-3xl font-semibold text-slate-900">Profile</h2>
            <div className="space-y-4 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Name</p>
                    <p className="mt-2 text-lg font-medium text-slate-900">{user.fullname}</p>
                </div>
                <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Email</p>
                    <p className="mt-2 text-lg font-medium text-slate-900">{user.email}</p>
                </div>
            </div>
        </section>
    )
}

export default Profile;
