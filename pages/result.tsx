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
        .then(res => {
            window.open(res.paymentIntent.charges.data[0].receipt_url, '_blank');
            return res;
        })
    )

    // setTimeout(() => window.open(data.paymentIntent.charges.data[0].receipt_url, '_blank'), 5000)

    return(
        <div>
            <h1 className='pt-4'>Payment Result</h1>
            <pre>{ data ? JSON.stringify(data, null, 2) : 'Loading...' }</pre>
        </div>
    )
}

export default Result