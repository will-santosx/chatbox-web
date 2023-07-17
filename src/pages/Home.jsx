/* eslint-disable no-unused-vars */
import React from 'react'
import { useSignInWithGoogle, useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '../data/firebase'
import { BsPlayFill } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { LuVerified } from 'react-icons/lu'

const Home = () => {
    const [signInWithGoogle] = useSignInWithGoogle(auth)
    const [singOut] = useSignOut(auth)

    const [user] = useAuthState(auth)
    //const user = true

    return (
        <div className="bg-gradient-to-tl from-blue-500 to-blue-600 w-screen h-screen flex items-center justify-center">
            <main className="md:w-[55%] md:h-[40%] w-[85%] h-[45%] bg-gray-800 rounded-md shadow-md border-2 border-gray-700 overflow-hidden text-gray-400">
                <header className="w-full bg-gray-900 h-[20%] py-1 px-2 text-center">
                    <h1 className="md:text-3xl text-xl font-semibold">GroupChat</h1>
                </header>
                <main className='w-full h-[80%] flex items-center justify-center flex-col gap-5 p-2'>
                    <h2 className='font-semibold text-lg m-3'>Faça login usando sua conta do Google</h2>
                    <div className='p-3 bg-gray-700 h-[30%] md:w-[60%] flex items-center justify-center rounded-md'>
                        <button title={user ? "Você já está logado em sua conta Google!" : null} disabled={user ? true : false} className='bg-blue-400 disabled:hover:cursor-not-allowed disabled:bg-red-300 text-white font-bold transition-colors hover:bg-blue-500 flex items-center overflow-hidden gap-3 p-1 w-full h-11 rounded-md'
                            onClick={() => signInWithGoogle()}>
                            <FcGoogle className='bg-white h-[90%] text-xl w-9 p-2 rounded-md shadow-sm' />CONTINUAR COM GOOGLE {user ? <LuVerified className='text-2xl' /> : null}</button>
                    </div>
                    <div className='w-full flex-col items-center flex justify-center'>
                        {user ?
                            <div className='w-full flex-col flex justify-center gap-3'>
                                <a className='w-full flex justify-center' href="/chatbox"><button
                                    title={"Pressione para iniciar no Chat."}
                                    disabled={false}
                                    className='bg-emerald-400 transition-colors hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-gray-300 disabled:hover:cursor-not-allowed text-white flex rounded-md font-semibold items-center justify-center gap-2 p-2 w-[60%] md:w-[30%]'
                                >COMEÇAR<BsPlayFill className='text-2xl' /></button></a>
                                <button onClick={() => singOut()} className='text-center uppercase text-[9px] md:text-sm font-semibold underline'>Desconectar conta</button>
                            </div>
                            :
                            <button
                                title={"Faça login com sua conta Google para continuar."}
                                disabled={true}
                                className='bg-emerald-400 transition-colors hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-gray-300 disabled:hover:cursor-not-allowed text-white flex rounded-md font-semibold items-center justify-center gap-2 p-2 w-[60%] md:w-[30%]'
                            >COMEÇAR<BsPlayFill className='text-2xl' /></button>
                        }
                    </div>
                </main>
            </main>
        </div>
    )
}

export default Home;