import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Shear Pins',
    path: '/shearpins',
    icon: <FaIcons.FaSteam />,
    cName: 'nav-text'
  },
  {
    title: 'Pump Head',
    path: '/pumphead',
    icon: <GiIcons.GiCartwheel />,
    cName: 'nav-text'
  },
  {
    title: 'Pump Power',
    path: '/pumppower',
    icon: <RiIcons.RiWaterFlashFill />,
    cName: 'nav-text'
  },
  {
    title: 'Motor Power',
    path: '/motorpower',
    icon: <GiIcons.GiElectric />,
    cName: 'nav-text'
  },
];
