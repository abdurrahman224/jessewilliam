import { Mail, ShieldCheck, User } from 'lucide-react';

const ProfileCard = ({ user, displayName, avatarLetter }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-300 to-blue-400 text-4xl font-bold text-white shadow-lg md:h-24 md:w-24">
                {avatarLetter}
              </div>
              {user.emailVerified && (
                <div className="absolute -right-0 -bottom-0 rounded-full bg-white p-1 shadow-md">
                  <ShieldCheck className="h-3 w-3 text-green-500 md:h-5 md:w-5" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{displayName}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Account Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Mail className="h-4 w-4" />
              Email Address
            </label>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              {user.email}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <User className="h-4 w-4" />
              Account Role
            </label>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              {user.role}
            </div>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-gray-600">User ID</label>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <code className="text-xs break-all text-gray-600 md:text-sm">{user.id}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
