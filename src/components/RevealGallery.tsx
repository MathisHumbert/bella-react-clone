import { useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

export default function RevealGallery() {
  useEffect(() => {
    const galleries = gsap.utils.toArray('.gallery__column') as HTMLElement[];
    const fillBackground = document.querySelector('.fill__background');

    const onMouseEnter = (e: any) => {
      const title = e.target.querySelector('.gallery__column__text');
      const paragraphMask = e.target.querySelector(
        '.gallery__column__paragraph--mask'
      );
      const paragraph = e.target.querySelector('.gallery__column__paragraph p');
      const imageContainer = e.target.querySelector('.gallery__column__image');
      const imageMask = e.target.querySelector('.gallery__column__image--mask');
      const image = e.target.querySelector('.gallery__column__image img');

      const tl = gsap.timeline({
        defaults: {
          duration: 0.7,
          ease: 'power4.out',
        },
      });

      tl.to(title, { y: '-27px' })
        .to([paragraph, paragraphMask, imageContainer, imageMask], { y: 0 }, 0)
        .to(image, { scale: 1, duration: 1.1 }, 0)
        .to(
          fillBackground,
          {
            backgroundColor: e.target.getAttribute('data-color'),
          },
          0
        );
    };

    const onMouseLeave = (e: any) => {
      const title = e.target.querySelector('.gallery__column__text');
      const paragraphMask = e.target.querySelector(
        '.gallery__column__paragraph--mask'
      );
      const paragraph = e.target.querySelector('.gallery__column__paragraph p');
      const imageContainer = e.target.querySelector('.gallery__column__image');
      const imageMask = e.target.querySelector('.gallery__column__image--mask');
      const image = e.target.querySelector('.gallery__column__image img');

      const tl = gsap.timeline({
        defaults: {
          duration: 0.7,
          ease: 'power4.out',
        },
      });

      tl.to(title, { y: 0 })
        .to([paragraphMask, imageContainer], { y: '-101%' }, 0)
        .to([paragraph, imageMask], { y: '100%' }, 0)
        .to(image, { scale: 1.2, duration: 1.1 }, 0)
        .to(
          fillBackground,
          { backgroundColor: 'rgb(172, 183, 174)', ease: 'none' },
          0
        );
    };

    galleries.forEach((gallery) => {
      gallery.addEventListener('mouseenter', onMouseEnter);
      gallery.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      galleries.forEach((gallery) => {
        gallery.removeEventListener('mouseenter', onMouseEnter);
        gallery.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);
  return (
    <Wrapper>
      <h2 className='gallery__heading'>
        <span>001 -</span> Our Values
      </h2>
      <div className='gallery__column left' data-color='#a6b3b3'>
        <div className='gallery__column__text'>
          <div className='gallery__column__heading'>
            <span>01</span>
            <h3>Adipisicing Elitare</h3>
          </div>
          <div className='gallery__column__paragraph'>
            <div className='gallery__column__paragraph--mask'>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </div>
        </div>
        <div className='gallery__column__image'>
          <div className='gallery__column__image--mask'>
            <img src='img_landscape-01-large.jpg' alt='landscape-01' />
          </div>
        </div>
      </div>
      <div className='gallery__column center' data-color='#b0a7a4'>
        <div className='gallery__column__text'>
          <div className='gallery__column__heading'>
            <span>02</span>
            <h3>Accusamus Accusantium</h3>
          </div>
          <div className='gallery__column__paragraph'>
            <div className='gallery__column__paragraph--mask'>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
          </div>
        </div>
        <div className='gallery__column__image'>
          <div className='gallery__column__image--mask'>
            <img src='img_landscape-02-large.jpg' alt='landscape-02' />
          </div>
        </div>
      </div>
      <div className='gallery__column right' data-color='#a3abb1'>
        <div className='gallery__column__text'>
          <div className='gallery__column__heading'>
            <span>03</span>
            <h3>Ratione Quibusdam</h3>
          </div>
          <div className='gallery__column__paragraph'>
            <div className='gallery__column__paragraph--mask'>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptas aut veritatis nostrum ratione quibusdam ea non
                laudantium accusamus accusantium molestias.
              </p>
            </div>
          </div>
        </div>
        <div className='gallery__column__image'>
          <div className='gallery__column__image--mask'>
            <img src='img_landscape-03-large.jpg' alt='landscape-03' />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  color: var(--text-color);

  .gallery__heading {
    position: absolute;
    left: var(--h-gutter);
    top: var(--v-spacing);
    font-size: 1.6vw;
    font-family: var(--font-headings);
    font-weight: 400;
    z-index: 2;

    span {
      opacity: 0.4;
    }
  }

  .gallery__column {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 var(--h-gutter);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 1px;
      height: 20vh;
      transform: translateY(-50%);
      background-color: var(--text-color);
      opacity: 0.4;
    }
  }

  .gallery__column__text {
    max-width: 17vw;
    position: relative;
    z-index: 2;
    pointer-events: none;
  }

  .gallery__column__heading {
    span {
      font-family: var(--font-headings);
      font-weight: 400;
      font-size: 2vw;
      opacity: 0.5;
    }

    h3 {
      font-family: var(--font-headings);
      font-weight: 400;
      font-size: 3.6vw;
      line-height: 1.19;
      margin: 1em 0;
    }
  }

  .gallery__column__paragraph {
    position: absolute;
    overflow: hidden;
    font-weight: 300;
    letter-spacing: 0.03vw;

    &--mask {
      transform: translateY(-101%);
      overflow: hidden;
    }

    p {
      transform: translateY(100%);
    }
  }

  .gallery__column__image {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    pointer-events: none;
    background-color: #000;
    transform: translateY(-101%);

    &--mask {
      height: 100%;
      overflow: hidden;
      /* transform: translateY(100%); */
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: 50% 50%;
      opacity: 0.6;
      transform: scale(1.2, 1.2);
    }
  }
`;
