import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function CheckoutLayout({ children }: { children: React.ReactNode }) {
  // Chequeo de sesión en el server antes de renderizar
  const access = (await cookies()).get('access_token')?.value
  if (!access) redirect('/auth/login?returnTo=/checkout')

  return <>{children}</>
}
