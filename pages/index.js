import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useTranslation, LanguageSwitcher } from '../lib/translations'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { t, dir } = useTranslation()

  if (status === 'loading') {
    return (
      <>
        <LanguageSwitcher />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t.loading}</p>
          </div>
        </div>
      </>
    )
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  return (
    <>
      <LanguageSwitcher />
      <div className="min-h-screen bg-gray-50" dir={dir}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{t.welcome}</h1>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                {t.signOut}
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{t.userInformation}</h2>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">{t.name}:</span> {session.user?.name || t.notSet}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">{t.email}:</span> {session.user?.email || t.notSet}
                  </p>
                  {session.user?.phone && (
                    <p className="text-gray-600">
                      <span className="font-medium">{t.phone}:</span> {session.user.phone}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="pt-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{t.authStatus}</h2>
                <p className="text-green-600 font-medium">{t.successfullyAuthenticated}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
