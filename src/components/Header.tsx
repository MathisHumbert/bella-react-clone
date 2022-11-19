import { useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation, useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const links = gsap.utils.toArray('.header__nav a') as HTMLElement[];

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
        ease: 'power4.out',
      });
    };

    ScrollTrigger.create({
      start: '100',
      end: 'bottom bottom-=20',
      toggleClass: {
        targets: 'body',
        className: 'has-scrolled',
      },
      onEnter: ({ direction }) => navAnimation(direction),
      onLeaveBack: ({ direction }) => navAnimation(direction),
    });

    return () => {
      links.map((link) => {
        link.removeEventListener('mouseleave', () => onMouseLeave(link));
      });
    };
  }, []);

  const handleClick = (e: any) => {
    e.preventDefault();
    const target = e.target.getAttribute('href');

    if (target === location.pathname) return;

    const loader = document.querySelector('.loader');
    const loaderInner = document.querySelector('.loader__inner');
    const loaderMask = document.querySelector('.loader__mask');

    const tl = gsap.timeline({
      defaults: {
        duration: 0.7,
        ease: 'power1.inOut',
      },
    });
    tl.set(loaderInner, { autoAlpha: 0 })
      .fromTo(loader, { yPercent: -100 }, { yPercent: 0 })
      .fromTo(
        loaderMask,
        { yPercent: 80 },
        {
          yPercent: 0,
          onComplete: () => {
            navigate(target);
          },
        },
        0
      );
  };

  return (
    <Wrapper className='header'>
      <div className='header__left'>
        <div className='header__left__img'>
          <img src='img_logo.svg' alt='logo' />
        </div>
        <h2 className='header__left__title'>bella</h2>
      </div>
      <div className='header__right'>
        <nav className='header__nav'>
          <ul>
            <li>
              <a onClick={handleClick} href='/'>
                our values
              </a>
            </li>
            <li>
              <a onClick={handleClick} href='/portfolio'>
                portfolio
              </a>
            </li>
            <li>
              <a onClick={handleClick} href='/'>
                blog
              </a>
            </li>
            <li>
              <a onClick={handleClick} href='/'>
                how we work
              </a>
            </li>
            <li>
              <a onClick={handleClick} href='/'>
                contact
              </a>
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
  z-index: 2;

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
