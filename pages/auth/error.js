import { useTranslation, LanguageSwitcher } from '../../lib/translations'

export default function ErrorPage() {
  const { t, dir } = useTranslation()
  
  return (
    <>
      <LanguageSwitcher />
      <div style={{ maxWidth: 480, margin: '2rem auto', direction: dir, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
        <h2>{t.errorOccurred}</h2>
        <p>{t.errorOccurredDesc}</p>
      </div>
    </>
  )
}
