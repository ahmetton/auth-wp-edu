import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation, LanguageSwitcher } from '../../lib/translations'

export default function ResetPassword() {
  const router = useRouter()
  const { token } = router.query
  const { t, dir } = useTranslation()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password !== confirmPassword) {
      setError(t.passwordsDoNotMatch)
      return
    }

    if (password.length < 8) {
      setError(t.passwordTooShort)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message || t.passwordResetSuccess)
        setTimeout(() => {
          router.push('/auth/signin')
        }, 2000)
      } else {
        setError(data.message || t.errorOccurred)
      }
    } catch (err) {
      setError(t.errorOccurred)
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <>
        <LanguageSwitcher />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
          <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.invalidResetLink}</h2>
            <p className="text-gray-600 mb-6">{t.invalidResetLinkDesc}</p>
            <Link href="/auth/reset-request" className="text-indigo-600 hover:text-indigo-500 font-medium">
              {t.requestNewLink}
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <LanguageSwitcher />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
              {t.setNewPassword}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {t.setNewPasswordDesc}
            </p>
          </div>

          {message && (
            <div className="rounded-md bg-green-50 p-4">
              <p className="text-sm text-green-800">{message}</p>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.newPassword}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={t.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.confirmPassword}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={t.confirmPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition"
              >
                {loading ? t.resetting : t.resetPasswordButton}
              </button>
            </div>

            <div className="text-center">
              <Link href="/auth/signin" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {t.backToSignIn}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
