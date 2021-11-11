import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as VscIcons from 'react-icons/vsc';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { BiLogOutCircle, BiLogInCircle } from 'react-icons/bi'

const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />
  },
  {
    title: 'History',
    path: '/history',
    icon: <FaIcons.FaHistory />
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <AiIcons.AiFillSetting />
  },
  {
    title: 'Ride',
    path: '/',
    icon: <VscIcons.VscPerson />
  },
  {
    title: 'Drive',
    path: '/',
    icon: <AiIcons.AiFillCar />
  },
  {
    title: 'Support',
    path: '/support',
    icon: <BsFillQuestionCircleFill />
  },
  {
    title: 'Register',
    path: '/register',
    icon: <FaIcons.FaRegistered />
  },
  {
    title: 'Login',
    path: '/login',
    icon: <BiLogInCircle />
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <BiLogOutCircle />
  }
]

export default SidebarData;