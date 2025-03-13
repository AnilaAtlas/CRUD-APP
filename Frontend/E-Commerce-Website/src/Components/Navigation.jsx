import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaShoppingCart } from 'react-icons/fa';
import logo from '../assets/images/logo (4).png';

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className='bg-white shadow-lg text-[#BD1521]'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex-shrink-0'>
						<Link to='/'>
							<img className='h-8 w-auto md:h-10' src={logo} alt='logo' />
						</Link>
					</div>

					<div className='hidden sm:flex space-x-6'>
						<NavLink to='/' icon={<FaHome />} text='Home' />
						<NavLink to='/products' text='Products' />
						<NavLink to='/about' text='About' />
						<NavLink to='/contact' text='Contact' />
						<NavLink to='/signup' text='Sign Up' />
						<NavLink to='/login' text='Login' />
					</div>

					<div className='hidden lg:flex items-center'>
						<Link to='/cart' className='relative flex items-center'>
							<FaShoppingCart className='h-6 w-6 sm:h-8 sm:w-8 hover:text-[#4bf6d4] transition duration-300' />
						</Link>
					</div>

					<div className='sm:hidden'>
						<button onClick={toggleMenu} className='text-gray-500 hover:text-[#BD1521] focus:outline-none'>
							{isOpen ? <FaTimes className='h-6 w-6' /> : <FaBars className='h-6 w-6' />}
						</button>
					</div>
				</div>
			</div>

			<div className={`${isOpen ? 'block' : 'hidden'} sm:hidden bg-white shadow-md`}>
				<div className='px-4 pt-2 pb-3 space-y-2'>
					<NavLinkMobile to='/' text='Home' onClick={toggleMenu} />
					<NavLinkMobile to='/products' text='Products' onClick={toggleMenu} />
					<NavLinkMobile to='/about' text='About' onClick={toggleMenu} />
					<NavLinkMobile to='/contact' text='Contact' onClick={toggleMenu} />
					<NavLinkMobile to='/signup' text='Sign Up' onClick={toggleMenu} />
					<NavLinkMobile to='/login' text='Login' onClick={toggleMenu} />
				</div>
			</div>
		</nav>
	);
};

const NavLink = ({ to, icon, text }) => (
	<Link to={to} className='flex items-center text-gray-700 hover:text-[#4bf6d4] transition duration-300 relative group'>
		{icon && <span className='mr-2'>{icon}</span>}
		<span>{text}</span>
		<span className='absolute bottom-0 left-0 w-full bg-[#4bf6d4] h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left'></span>
	</Link>
);

const NavLinkMobile = ({ to, text, onClick }) => (
	<Link
		to={to}
		onClick={onClick}
		className='block py-2 px-3 text-gray-700 hover:text-[#BD1521] transition duration-300 relative group'>
		<span>{text}</span>
		<span className='absolute bottom-0 left-0 w-full  h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
	</Link>
);

export default Navigation;