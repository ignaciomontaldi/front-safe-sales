import { FaSpinner } from 'react-icons/fa'
import { useLoading } from '../../hooks/useLoading'

function Loading({message} : {message: string}) {
    const {load} = useLoading();
    return (
        <div id="loading-section" className={!load ? 'hidden' : ' mt-12 mx-auto font-semibold text-xl text-softBlack text-center flex items-center justify-center'}>
            <FaSpinner className='animate-spin' />
            <p className='ml-4'>{message}</p>
        </div>
    )
}

export default Loading