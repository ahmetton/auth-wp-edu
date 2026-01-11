import { getProviders, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function SignIn({ providers }) {
  const router = useRouter()
  const { redirect_to } = router.query
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const handleEmailSignIn = async (e) => {
    e.preventDefault()
    await signIn('email', { email, callbackUrl: redirect_to || '/' })
  }

  const handleOAuth = (providerId) => async (e) => {
    e.preventDefault()
    await signIn(providerId, { callbackUrl: redirect_to || '/' })
  }

  const sendOtp = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/auth/otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone }) })
    if (res.ok) setOtpSent(true)
  }

  const verifyOtp = async (e) => {
    e.preventDefault()
    const token = e.target.otp.value
    const res = await fetch('/api/auth/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone, token }) })
    if (res.ok) {
      window.location.href = redirect_to || '/'
    } else {
      alert('رمز غير صحيح')
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', padding: '1rem', border: '1px solid #ddd', direction: 'rtl', textAlign: 'right' }}>
      <h2>تسجيل الدخول</h2>

      <form onSubmit={handleEmailSignIn} style={{ marginBottom: '1rem' }}>
        <label>البريد الإلكتروني</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '6px', boxSizing: 'border-box' }} />
        <button type="submit" style={{ marginTop: '8px' }}>تسجيل الدخول بالبريد</button>
      </form>

      <div style={{ marginBottom: '1rem' }}>
        {providers && Object.values(providers).map((p) => p.id !== 'email' && (
          <div key={p.name} style={{ marginBottom: '.5rem' }}>
            <button onClick={handleOAuth(p.id)}>تسجيل الدخول عبر {p.name}</button>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
        <h3>الهاتف (تجربة)</h3>
        {!otpSent ? (
          <form onSubmit={sendOtp}>
            <input type="tel" placeholder="+9665..." value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '6px', boxSizing: 'border-box' }} />
            <button type="submit" style={{ marginTop: '8px' }}>إرسال الرمز</button>
          </form>
        ) : (
          <form onSubmit={verifyOtp}>
            <input name="otp" placeholder="أدخل الرمز" required style={{ width: '100%', padding: '8px', marginTop: '6px', boxSizing: 'border-box' }} />
            <button type="submit" style={{ marginTop: '8px' }}>تحقق</button>
          </form>
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return { props: { providers } }
}
