import Link from 'next/link'
import { useTranslation, LanguageSwitcher } from '../../lib/translations'

export default function Home() {
  const { t, dir } = useTranslation()
  
  return (
    <>
      <LanguageSwitcher />
      <div style={{ maxWidth: 720, margin: '2rem auto', direction: dir, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
        <h1>{t.authApp}</h1>
        <p>{t.authAppDesc}</p>
        <p>
          {t.openSignInPage} <Link href="/auth/signin">{t.signInPageLink}</Link> {t.toTestLogin}
        </p>
      </div>
    </>
  )
}
