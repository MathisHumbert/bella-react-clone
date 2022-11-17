import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  id: number;
  title: string;
  text: string;
  img: string;
  color: string;
};

export default function WorkItem({ id, title, text, img, color }: Props) {
  const workItemRef = useRef<HTMLElement>(null);
  const workItemImageRef = useRef(null);

  useEffect(() => {
    const links = gsap.utils.toArray('.work__nav li') as HTMLElement[];

    const getVh = () => {
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      return vh;
    };

    const parallax = gsap.to(workItemImageRef.current, {
      yPercent: 20,
      ease: 'none',
    });

    ScrollTrigger.create({
      animation: parallax,
      trigger: workItemRef.current,
      start: 'top bottom',
      scrub: 1,
    });

    const bgcolor = workItemRef.current!.getAttribute('data-color')!;

    ScrollTrigger.create({
      trigger: workItemRef.current,
      start: 'top center',
      end: () => `+=${workItemRef.current!.clientHeight + getVh() / 10}`,
      toggleClass: {
        targets: links[id - 1],
        className: 'active',
      },
      onEnter: () =>
        gsap.to('.fill__background', {
          backgroundColor: bgcolor,
          ease: 'none',
        }),
      onEnterBack: () =>
        gsap.to('.fill__background', {
          backgroundColor: bgcolor,
          ease: 'none',
        }),
    });
  }, []);

  return (
    <Wrapper id={`work${id}`} ref={workItemRef} data-color={color}>
      <div className='work__item__image'>
        <img src={img} alt={title} ref={workItemImageRef} />
      </div>
      <div className='work__item__heading'>
        <p>0{id}</p>
        <h3>{title}</h3>
      </div>
      <div className='work__item__text'>
        <p>{text}</p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  color: var(--text-color);

  .work__item__image {
    position: relative;
    width: calc(50vw + var(--h-gutter));
    padding-bottom: 33.33vw;
    margin: 0 var(--h-gutter) 0 33.33vw;
    background-color: #000;
    overflow: hidden;
    z-index: 1;

    img {
      position: absolute;
      top: -20%;
      left: 0;
      height: 120%;
      width: 100%;
      object-fit: cover;
      object-position: 50% 50%;
      opacity: 0.9;
      will-change: transform;
    }
  }

  .work__item__heading {
    position: relative;
    font-family: var(--font-headings);
    z-index: 2;

    p,
    h3 {
      position: absolute;
      left: 25vw;
      margin: 0;
      white-space: nowrap;
      font-weight: 400;
    }

    p {
      top: calc(var(--v-spacing) * -1.75);
      opacity: 0.4;
      font-size: 1.6vw;
    }

    h3 {
      top: calc(var(--v-spacing) * -1.25);
      font-size: 3.6vw;
    }
  }

  .work__item__text {
    margin: 0 calc(30vw + var(--h-gutter)) var(--v-spacing) 33.33vw;

    p {
      margin: 1em;
      font-weight: 300;
    }
  }
`;
