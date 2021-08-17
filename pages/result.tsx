import { useRouter } from 'next/router'
import useSWR from 'swr'

const Result = () => {
    const router = useRouter();
    const { session_id } = router.query;
    
    const { data, error } = useSWR(
        session_id 
            ? (typeof(session_id) === 'string' && session_id.match(/pi/)) ? `api/paymentIntent/${session_id}` : `api/checkout/${session_id}` 
            : null,
        (url) => fetch(url)
        .then(res => res.json())
    )

    return(
        <div className='mx-20 mt-8'>
            <h1 className='pt-4 my-2 text-3xl text-yellow-500 font-mono'>Payment Result</h1>
            <pre className='bg-gray-300 p-4 rounded-lg'>{ data ? JSON.stringify(data, null, 2) : 'Loading...' }</pre>
        </div>
    )
}

export default Result