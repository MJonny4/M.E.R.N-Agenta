import { motion } from 'framer-motion'
import { FC } from 'react'
import { FaClock, FaHeart } from 'react-icons/fa'
import Header from '../components/Header'

const About: FC = () => {
    return (
        <>
            <Header />
            <motion.main
                className='bg-light-coffee-cream min-h-screen pt-20 pb-16 px-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className='max-w-6xl mx-auto'>
                    <motion.h1
                        className='text-4xl md:text-5xl font-bold text-dark-espresso text-center mb-12'
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    >
                        About Agenta
                    </motion.h1>

                    <motion.div
                        className='md:flex items-center mb-16'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className='md:w-1/2 mb-8 md:mb-0'>
                            <h2 className='text-2xl md:text-3xl font-semibold text-mocha-brown mb-4'>
                                Your Personal Productivity Companion
                            </h2>
                            <p className='text-dark-espresso text-lg leading-relaxed'>
                                At Agenta, we believe that a well-organized day is the key to a fulfilled life. Our app
                                is designed to be your go-to companion for managing tasks, events, and even those
                                much-needed coffee breaks. With a warm, inviting interface inspired by the comforting
                                hues of coffee, we make productivity a delightful experience.
                            </p>
                        </div>
                        <div className='md:w-1/2 md:pl-12'>
                            <motion.img
                                src={'/person_coffee.webp'}
                                alt='Person enjoying coffee while using Agenta app'
                                className='rounded-lg shadow-xl'
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 100 }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className='grid grid-cols-1 md:grid-cols-2 gap-12'
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.3,
                                },
                            },
                        }}
                        initial='hidden'
                        animate='visible'
                    >
                        <motion.div
                            className='bg-medium-coffee-latte p-8 rounded-lg shadow-md text-dark-espresso'
                            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                        >
                            <FaHeart className='text-4xl mb-6 text-rich-chocolate' />
                            <h3 className='text-2xl font-semibold text-mocha-brown mb-4'>Crafted with Love</h3>
                            <p className='text-base leading-relaxed'>
                                Our passionate team of developers, designers, and productivity enthusiasts have poured
                                their hearts into creating an app that truly understands your daily grind. We've been in
                                your shoes, juggling tasks and missing out on breaks. That's why every feature in Daily
                                Stuff is crafted with empathy and a desire to make your day smoother.
                            </p>
                        </motion.div>

                        <motion.div
                            className='bg-medium-coffee-latte p-8 rounded-lg shadow-md text-dark-espresso'
                            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                        >
                            <FaClock className='text-4xl mb-6 text-rich-chocolate' />
                            <h3 className='text-2xl font-semibold text-mocha-brown mb-4'>Time is Precious</h3>
                            <p className='text-base leading-relaxed'>
                                We understand that your time is as precious as the last sip of your favorite coffee.
                                That's why Agenta is built for efficiency. Quick task entry, intuitive event planning,
                                and timely reminders for your breaks – all designed to save you time so you can focus on
                                what truly matters, whether it's nailing that project or savoring your coffee moments.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.main>
        </>
    )
}

export default About
