import { useRouter } from 'next/router'
import { useEffect } from 'react';
// import useSWR from 'swr'

export default function Sell() {
    const router = useRouter();

    useEffect(()=> {
        fetch('/api/connect/standard', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: null
        }).then(res => res.json())
        .then(res => {
            console.log('res',res.url)
            router.push(res.url)
        })
    })

    return(
        <div className='mt-20 w-full'>
            <div className='animate-pulse text-yellow-500 text-center font-mono text-3xl'>Redirecting you to your onboarding experience...</div>
        </div>
    )
}