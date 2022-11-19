import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/all';

import WorkItem from './WorkItem';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const workData = [
  {
    id: 1,
    title: 'Amet Consectetur',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, vel. Vel qui ipsum eum similique reiciendis dicta dignissimos sed ipsa.',
    img: 'img_landscape-01-large.jpg',
    color: '#8c8480',
  },
  {
    id: 2,
    title: 'Eum Similique',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, vel. Vel qui ipsum eum similique reiciendis dicta dignissimos sed ipsa.',
    img: 'img_landscape-02-large.jpg',
    color: '#505156',
  },
  {
    id: 3,
    title: 'Cupiditate Vel',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, vel. Vel qui ipsum eum similique reiciendis dicta dignissimos sed ipsa.',
    img: 'img_landscape-01-large.jpg',
    color: '#717872',
  },
  {
    id: 4,
    title: 'Dignissimos Sed',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, vel. Vel qui ipsum eum similique reiciendis dicta dignissimos sed ipsa.',
    img: 'img_landscape-02-large.jpg',
    color: '#ccb28b',
  },
];

export default function Work() {
  const workRef = useRef(null);
  const workNavRef = useRef(null);

  useEffect(() => {
    const links = gsap.utils.toArray('.work__nav li') as HTMLElement[];

    ScrollTrigger.create({
      trigger: workRef.current,
      start: 'top center',
      end: 'bottom center',
      onLeave: () =>
        gsap.to('.fill__background', {
          backgroundColor: 'rgb(172, 183, 174)',
          ease: 'none',
        }),
      onLeaveBack: () =>
        gsap.to('.fill__background', {
          backgroundColor: 'rgb(172, 183, 174)',
          ease: 'none',
        }),
    });

    ScrollTrigger.create({
      trigger: workNavRef.current,
      start: 'top center',
      end: 'center center',
      endTrigger: '#work4',
      pin: true,
    });

    const onLinkClick = (e: any) => {
      e.preventDefault();
      const target = e.target.getAttribute('href');

      gsap.to(window, {
        duration: 1.5,
        scrollTo: target,
        ease: 'power2.out',
      });
    };

    links.forEach((link) => {
      link.addEventListener('click', onLinkClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', onLinkClick);
      });
    };
  }, []);

  return (
    <Wrapper ref={workRef}>
      <h2 className='work__heading'>
        <span>004 -</span> How We Work
      </h2>
      <div className='work__nav' ref={workNavRef}>
        <ul>
          <li>
            <a href='#work1'>Amet Consectetur </a>
          </li>
          <li>
            <a href='#work2'>Eum Similique</a>
          </li>
          <li>
            <a href='#work3'>Cupiditate Vel</a>
          </li>
          <li>
            <a href='#work4'>Dignissimos Sed</a>
          </li>
        </ul>
      </div>
      {workData.map((work) => (
        <WorkItem key={work.id} {...work} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  padding: var(--v-spacing) 0;

  .work__heading {
    position: absolute;
    top: calc(var(--v-spacing) * 2);
    left: var(--h-gutter);
    font-size: 1.6vw;
    color: var(--text-color);
    font-family: var(--font-headings);
    font-weight: 400;

    span {
      opacity: 0.4;
    }
  }

  .work__nav {
    position: absolute;
    top: calc(var(--v-spacing) * 3);
    left: var(--h-gutter);

    li {
      list-style-type: none;
      overflow: hidden;
    }

    li a {
      display: block;
      position: relative;
      padding-left: 1.8vw;
      transform: translateX(-1.8vw);
      color: var(--text-color);
      opacity: 0.4;
      text-decoration: none;
      font-family: var(--font-headings);
      cursor: pointer;
      transition: all 0.3s var(--easing);

      &:before {
        content: '';
        display: block;
        height: 2px;
        width: 1.3vw;
        background-color: var(--text-color);
        position: absolute;
        top: 50%;
        left: 0;
      }
    }

    li.active a {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
