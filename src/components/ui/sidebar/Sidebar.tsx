'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';
import { useUIStore } from '@/store';
import { useAuth } from '@/hooks/useAuth';

export const Sidebar = () => {
  const menuItemStyle =
  "flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all";
  
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { user, loading } = useAuth();

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    window.location.href = '/auth/login';
  };

  return (
    <div>
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          { 'translate-x-full': !isSideMenuOpen }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />

        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menú dinámico */}
        {!loading && (
          <>
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                  <IoPersonOutline size={30} />
                  <span className="ml-3 text-xl">Perfil</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all cursor-pointer w-full text-left appearance-none"
                >
                  <IoLogOutOutline size={30} />
                  <span className="ml-3 text-xl">Salir</span>
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                onClick={closeMenu}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoLogInOutline size={30} />
                <span className="ml-3 text-xl">Ingresar</span>
              </Link>
            )}

            {isAdmin && (
              <>
                <div className="w-full h-px bg-gray-200 my-10" />
                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                  <IoPeopleOutline size={30} />
                  <span className="ml-3 text-xl">Administrar</span>
                </Link>
              </>
            )}
          </>
        )}
      </nav>
    </div>
  );
};
