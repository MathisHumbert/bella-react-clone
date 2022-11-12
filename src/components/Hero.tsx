import { useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

export default function Hero() {
  useEffect(() => {
    const hero = document.querySelector('.hero')!;

    const moveImages = (e: any) => {
      const { offsetX, offsetY, target } = e;
      const { clientWidth, clientHeight } = target;

      const xPos = offsetX / clientWidth - 0.5;
      const yPos = offsetY / clientHeight - 0.5;

      const leftImages = gsap.utils.toArray(
        '.hero__gallery__left .hero__gallery__image'
      ) as string[];
      const rightImages = gsap.utils.toArray(
        '.hero__gallery__right .hero__gallery__image'
      ) as string[];

      const modifier = (index: number) => index * 1.2 + 0.5;

      leftImages.forEach((image, index) => {
        gsap.to(image, {
          duration: 1.2,
          x: xPos * 20 * modifier(index),
          y: yPos * 30 * modifier(index),
          rotationY: xPos * 10,
          rotationX: xPos * 10,
          ease: 'power3.out',
        });
      });

      rightImages.forEach((image, index) => {
        gsap.to(image, {
          duration: 1.2,
          x: xPos * 20 * modifier(index),
          y: -yPos * 30 * modifier(index),
          rotationY: xPos * 10,
          rotationX: xPos * 10,
          ease: 'power3.out',
        });
      });

      gsap.to('.hero__circle', {
        x: 100 * xPos,
        y: 100 * yPos,
        ease: 'power4.out',
      });
    };

    hero.addEventListener('mousemove', moveImages);

    return () => {
      hero.removeEventListener('mousemove', moveImages);
    };
  }, []);

  return (
    <Wrapper className='hero'>
      <h1 className='hero__title'>
        <span>Consectetur</span>
        <span>Adipisicing</span>
        <span>Elites</span>
      </h1>
      <p className='hero__text'>
        VOLUPTAS AUT <br /> & VERITASIS NOSTRUM
      </p>
      <div className='hero__circle'></div>
      <div className='hero__gallery'>
        <div className='hero__gallery__left'>
          <div className='hero__gallery__image hero__gallery__image--l'>
            <img src='img_landscape-01-large.jpg' alt='landscape-01-l' />
          </div>
          <div className='hero__gallery__image hero__gallery__image--m'>
            <img src='img_landscape-02-large.jpg' alt='landscape-02-l' />
          </div>
          <div className='hero__gallery__image hero__gallery__image--s'>
            <img src='img_landscape-03-large.jpg' alt='landscape-03-l' />
          </div>
        </div>
        <div className='hero__gallery__right'>
          <div className='hero__gallery__image hero__gallery__image--l'>
            <img src='img_landscape-03-large.jpg' alt='landscape-03-l' />
          </div>
          <div className='hero__gallery__image hero__gallery__image--m'>
            <img src='img_landscape-01-large.jpg' alt='landscape-01-l' />
          </div>
          <div className='hero__gallery__image hero__gallery__image--s'>
            <img src='img_landscape-02-large.jpg' alt='landscape-02-l' />
          </div>
        </div>
      </div>
      <div className='hero__logo'>
        <div className='hero__logo__inner'></div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 1;

  .hero__title {
    font-size: 7vw;
    line-height: 7.4vw;
    font-family: var(--font-headings);
    font-weight: 400;
    color: var(--text-color);
    margin-top: 0.67em;
    pointer-events: none;
    z-index: 2;

    span {
      display: block;
    }
  }

  .hero__text {
    font-size: 1.3vw;
    letter-spacing: 0.3vw;
    color: var(--text-color);
    font-weight: 300;
    transform: translateX(-9vw);
    pointer-events: none;
    margin: 1em 0;
    z-index: 2;
  }

  .hero__circle {
    position: absolute;
    top: 45vh;
    left: 27vh;
    width: 23vw;
    height: 23vw;
    border: 1px solid var(--text-color);
    border-radius: 100%;
    opacity: 0.4;
    pointer-events: none;
    will-change: transform;
  }

  .hero__gallery__left {
    .hero__gallery__image:nth-child(1) {
      top: 17vh;
      left: 15vw;
    }

    .hero__gallery__image:nth-child(2) {
      top: 30vh;
      left: 6vw;
    }

    .hero__gallery__image:nth-child(3) {
      top: 56vh;
      left: 14vw;
    }
  }

  .hero__gallery__right {
    .hero__gallery__image:nth-child(1) {
      top: 15vh;
      right: 21vw;
      width: 24vw;
      padding-bottom: 21vw;
    }

    .hero__gallery__image:nth-child(2) {
      top: 27vh;
      right: 10vw;
    }

    .hero__gallery__image:nth-child(3) {
      top: 56vh;
      right: 19vw;
      width: 16vw;
      padding-bottom: 20vw;
    }
  }

  .hero__gallery__image {
    position: absolute;
    pointer-events: none;
    background-color: #000;
    will-change: transform;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
      opacity: 0.8;
    }
  }

  .hero__gallery__image--l {
    width: 18vw;
    padding-bottom: 26vw;
  }

  .hero__gallery__image--m {
    width: 18vw;
    padding-bottom: 26.55vw;
  }

  .hero__gallery__image--s {
    width: 13vw;
    padding-bottom: 19vw;
  }

  .hero__logo {
    position: absolute;
    bottom: 0;
    left: 58%;
    width: 7.7vw;
    height: 7.7vw;
    transform: translateY(50%);
    background: url('img_logo.svg') no-repeat center;
    background-size: 50% 50%;
    pointer-events: none;
  }

  .hero__logo__inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 7.7vw;
    height: 7.7vw;
    background: url('img_scroll-badge.svg') no-repeat center;
    background-size: 100% 100%;
    animation: rotation 45s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
