// Simple translation system supporting Arabic and English
export const translations = {
  en: {
    // Sign In Page
    signIn: 'Sign In',
    email: 'Email',
    emailOrPhone: 'Email or Phone',
    password: 'Password',
    rememberMe: 'Remember me',
    signInButton: 'Sign In',
    forgotPassword: 'Forgot password?',
    noAccount: "Don't have an account?",
    signUp: 'Sign up',
    orContinueWith: 'Or continue with',
    
    // Registration
    register: 'Register',
    name: 'Name (optional)',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    
    // Password Reset
    resetPassword: 'Reset Password',
    resetPasswordTitle: 'Reset Password',
    resetPasswordDesc: 'Enter your email address and we will send you a link to reset your password.',
    sendResetLink: 'Send Reset Link',
    sending: 'Sending...',
    backToSignIn: 'Back to Sign In',
    
    // Set New Password
    setNewPassword: 'Set New Password',
    setNewPasswordDesc: 'Enter your new password below.',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    resetPasswordButton: 'Reset Password',
    resetting: 'Resetting...',
    invalidResetLink: 'Invalid Reset Link',
    invalidResetLinkDesc: 'This password reset link is invalid or has expired.',
    requestNewLink: 'Request a new reset link',
    
    // Messages
    passwordsDoNotMatch: 'Passwords do not match',
    passwordTooShort: 'Password must be at least 8 characters',
    passwordResetSuccess: 'Password reset successfully',
    checkYourEmail: 'Check Your Email',
    checkYourEmailDesc: 'We sent a login link to your email. Please check your inbox or spam folder.',
    errorOccurred: 'An error occurred',
    errorOccurredDesc: 'Something went wrong while trying to sign in. Please try again or contact support.',
    
    // Home Page
    welcome: 'Welcome!',
    userInformation: 'User Information',
    notSet: 'Not set',
    phone: 'Phone',
    authStatus: 'Authentication Status',
    successfullyAuthenticated: '✓ You are successfully authenticated',
    signOut: 'Sign Out',
    loading: 'Loading...',
    
    // Auth App Home
    authApp: 'Authentication App',
    authAppDesc: 'This is the authentication app for Huda Resources website.',
    openSignInPage: 'Open',
    signInPageLink: 'sign in page',
    toTestLogin: 'to test the login process.',
    
    // Phone/OTP (experimental)
    phoneExperimental: 'Phone (Experimental)',
    sendCode: 'Send Code',
    enterCode: 'Enter Code',
    verify: 'Verify',
    invalidCode: 'Invalid code',
    
    // Language
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
  },
  ar: {
    // Sign In Page
    signIn: 'تسجيل الدخول',
    email: 'البريد الإلكتروني',
    emailOrPhone: 'البريد الإلكتروني أو الهاتف',
    password: 'كلمة المرور',
    rememberMe: 'تذكرني',
    signInButton: 'تسجيل الدخول',
    forgotPassword: 'نسيت كلمة المرور؟',
    noAccount: 'ليس لديك حساب؟',
    signUp: 'سجل الآن',
    orContinueWith: 'أو تابع باستخدام',
    
    // Registration
    register: 'التسجيل',
    name: 'الاسم (اختياري)',
    createAccount: 'إنشاء حساب',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    
    // Password Reset
    resetPassword: 'إعادة تعيين كلمة المرور',
    resetPasswordTitle: 'إعادة تعيين كلمة المرور',
    resetPasswordDesc: 'أدخل عنوان البريد الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.',
    sendResetLink: 'إرسال رابط إعادة التعيين',
    sending: 'جاري الإرسال...',
    backToSignIn: 'العودة إلى تسجيل الدخول',
    
    // Set New Password
    setNewPassword: 'تعيين كلمة مرور جديدة',
    setNewPasswordDesc: 'أدخل كلمة المرور الجديدة أدناه.',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور',
    resetPasswordButton: 'إعادة تعيين كلمة المرور',
    resetting: 'جاري إعادة التعيين...',
    invalidResetLink: 'رابط إعادة التعيين غير صالح',
    invalidResetLinkDesc: 'هذا الرابط لإعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية.',
    requestNewLink: 'اطلب رابط إعادة تعيين جديد',
    
    // Messages
    passwordsDoNotMatch: 'كلمتا المرور غير متطابقتين',
    passwordTooShort: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
    passwordResetSuccess: 'تمت إعادة تعيين كلمة المرور بنجاح',
    checkYourEmail: 'تحقق من بريدك',
    checkYourEmailDesc: 'أرسلنا رابط تسجيل الدخول إلى بريدك الإلكتروني. الرجاء التحقق من صندوق الوارد أو صندوق الرسائل غير المرغوب فيها.',
    errorOccurred: 'حدث خطأ',
    errorOccurredDesc: 'وقعت مشكلة أثناء محاولة الدخول. الرجاء المحاولة مرة أخرى أو التواصل مع الدعم.',
    
    // Home Page
    welcome: 'مرحباً!',
    userInformation: 'معلومات المستخدم',
    notSet: 'غير محدد',
    phone: 'الهاتف',
    authStatus: 'حالة المصادقة',
    successfullyAuthenticated: '✓ تم تسجيل الدخول بنجاح',
    signOut: 'تسجيل الخروج',
    loading: 'جاري التحميل...',
    
    // Auth App Home
    authApp: 'تطبيق المصادقة',
    authAppDesc: 'هذا هو تطبيق المصادقة الخاص بموقع موارد الهدى.',
    openSignInPage: 'افتح',
    signInPageLink: 'صفحة تسجيل الدخول',
    toTestLogin: 'لاختبار عملية الدخول.',
    
    // Phone/OTP (experimental)
    phoneExperimental: 'الهاتف (تجربة)',
    sendCode: 'إرسال الرمز',
    enterCode: 'أدخل الرمز',
    verify: 'تحقق',
    invalidCode: 'رمز غير صحيح',
    
    // Language
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',
  }
}

// Hook to use translations
export function useTranslation() {
  if (typeof window === 'undefined') {
    // Server-side: default to Arabic
    return { t: translations.ar, locale: 'ar', setLocale: () => {}, dir: 'rtl' }
  }
  
  const [locale, setLocaleState] = require('react').useState(() => {
    return localStorage.getItem('locale') || 'ar'
  })
  
  const setLocale = (newLocale) => {
    localStorage.setItem('locale', newLocale)
    setLocaleState(newLocale)
  }
  
  const t = translations[locale] || translations.ar
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  
  return { t, locale, setLocale, dir }
}

// Language switcher component
export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()
  
  return (
    <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
      <button
        onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          border: '1px solid #ddd',
          background: 'white',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: '500',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        {locale === 'en' ? 'العربية' : 'English'}
      </button>
    </div>
  )
}
