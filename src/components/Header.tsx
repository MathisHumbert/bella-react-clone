import { useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import logo from '../assets/img_logo.svg';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  useEffect(() => {
    const links = gsap.utils.toArray('.header__nav a') as HTMLElement[];
    const header = document.querySelector('.header');

    const onMouseLeave = (link: HTMLElement) => {
      link.classList.add('animate-out');
      setTimeout(() => link.classList.remove('animate-out'), 300);
    };

    links.map((link) => {
      link.addEventListener('mouseleave', () => onMouseLeave(link));
    });

    const navAnimation = (direction: number) => {
      return gsap.to(links, {
        duration: 0.3,
        stagger: { each: 0.05, from: direction === 1 ? 'start' : 'end' },
        y: direction === 1 ? 20 : 1,
        opacity: direction === 1 ? 0 : 1,
      });
    };

    ScrollTrigger.create({
      start: '100',
      end: 'bottom bottom-=20',
      toggleClass: {
        targets: 'body',
        className: 'has-scrolled',
      },
      markers: true,
      onEnter: ({ direction }) => navAnimation(direction),
      onLeaveBack: ({ direction }) => navAnimation(direction),
    });

    return () => {
      links.map((link) => {
        link.removeEventListener('mouseleave', () => onMouseLeave(link));
      });
    };
  }, []);

  return (
    <Wrapper className='header'>
      <div className='header__left'>
        <div className='header__left__img'>
          <img src={logo} alt='logo' />
        </div>
        <h2 className='header__left__title'>bella</h2>
      </div>
      <div className='header__right'>
        <nav className='header__nav'>
          <ul>
            <li>
              <a href='/'>our values</a>
            </li>
            <li>
              <a href='/'>portfolio</a>
            </li>
            <li>
              <a href='/'>blog</a>
            </li>
            <li>
              <a href='/'>how we work</a>
            </li>
            <li>
              <a href='/'>contact</a>
            </li>
          </ul>
        </nav>
        <button className='header__burger'>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;

  .header__left {
    padding-left: var(--h-gutter);
    position: relative;
  }

  .header__left__img {
    position: absolute;
    left: 1.2vw;
    top: 50%;
    transform: translateY(-50%);
    max-width: 55px;
    max-height: 55px;
    margin-left: 1.2vw;
    opacity: 0;
    transition: opacity 0.3s linear;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .header__left__title {
    font-size: 3.125vw;
    font-family: var(--font-headings);
    letter-spacing: 7px;
    text-transform: uppercase;
    color: var(--text-color);
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.3s linear;
  }

  .header__right {
    display: flex;
    align-items: center;
    gap: 3vw;
    padding-right: var(--h-gutter);
  }

  .header__nav ul {
    display: flex;
    gap: 3vw;
  }

  .header__nav li {
    list-style-type: none;
    display: flex;
    border: 1px solid red;
    overflow: hidden;
  }

  .header__nav a {
    display: inline-block;
    color: var(--text-color);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1vw;
    position: relative;
    overflow: hidden;

    &:after {
      content: '';
      display: block;
      height: 2px;
      background: var(--text-color);
      position: absolute;
      bottom: 0;
      width: 100%;
      transform: translateX(-101%);
    }

    &:hover {
      &:after {
        transition: transform 0.3s var(--easing);
        transform: translateX(0%);
      }
    }

    &.animate-out {
      &::after {
        transition: transform 0.3s var(--easing);
        transform: translateX(100%);
      }
    }
  }

  .header__burger {
    width: var(--burger-width);
    height: 40px;
    cursor: pointer;
    border: 0;
    background: none;
    transform: translateX(0);
    transition: transform 0.3s var(--easing);

    span {
      width: var(--burger-width);
      height: 2px;
      background: var(--text-color);
      margin: 6px 0;
      display: block;
    }
  }
`;
