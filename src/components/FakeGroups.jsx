import { FaUsers } from 'react-icons/fa'

const FakeGroups = () => {
    return (
        <div
            title='Não funcional!'
            className="bg-gray-700 transition-all shadow-sm rounded-full hover:scale-[102%] hover:rounded-xl w-[3rem] h-[3rem] flex items-center justify-center cursor-pointer">
            <FaUsers className='text-2xl text-white' />
        </div>
    )
}

export default FakeGroups