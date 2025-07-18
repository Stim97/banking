import { logoutAccount } from '@/lib/actions/user.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = ({user, type= 'destop'}: FooterProps) => {

    const router = useRouter()
    const handleLogout = async () => {
        const logOut = await logoutAccount()
        if (logOut) router.push('/sign-in')
        
        console.log('logout')
    }
  return (
    <footer className='footer'>
        <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
            <p className='text-xl font-bold text-gray-700'>
                {user?.name[0]}
            </p>
        </div>

        <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
            <h1 className='text-16 truncate font-normal text-gray-600'>
                {user?.name}
            </h1>

            <p className='text-16 truncate  text-gray-600'>
                {user?.email}
            </p>
        </div>

        <div className="image" onClick={handleLogout}>
            <Image src='icons/logout.svg' width={20} height={20} alt='logout' />
        </div>
    </footer>
  )
}

export default Footer