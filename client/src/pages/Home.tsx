import { motion } from 'framer-motion'
import { FC } from 'react'
import { FaCalendarAlt, FaClipboardList, FaCoffee } from 'react-icons/fa'
import Card from '../components/Card'
import Header from '../components/Header'

const Home: FC = () => {
    return (
        <>
            <Header />
            <motion.main
                className='bg-light-coffee-cream min-h-screen pt-20 pb-16 px-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.h1
                    className='text-4xl md:text-5xl font-bold text-dark-espresso text-center mb-12'
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    Manage Your Daily Agenda with Ease
                </motion.h1>
                <motion.img
                    src='src/images/room.webp'
                    alt='A nice room with a view'
                    className='rounded-lg object-scale-down w-full h-auto md:w-3/4 mx-auto shadow-xl'
                    transition={{ type: 'spring', stiffness: 100 }}
                />
                <motion.div
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative md:top-[-5rem]'
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                    initial='hidden'
                    animate='visible'
                >
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                        <Card title='Tasks' description='Keep track of your daily tasks' icon={<FaClipboardList />} />
                    </motion.div>
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                        <Card title='Events' description='Plan and manage your events' icon={<FaCalendarAlt />} />
                    </motion.div>
                    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                        <Card title='Brew Time' description='Never forget your coffee breaks' icon={<FaCoffee />} />
                    </motion.div>
                </motion.div>
            </motion.main>
        </>
    )
}

export default Home
