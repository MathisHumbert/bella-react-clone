import { useEffect } from 'react';
import gsap from 'gsap';
import styled from 'styled-components';

export default function Portfolio() {
  useEffect(() => {
    const links = gsap.utils.toArray(
      '.portfolio__categories a'
    ) as HTMLElement[];
    const porfolioContainer = document.querySelector('.portfolio__categories')!;
    const largeImageContainer = document.querySelector('.portfolio__image--l');
    const smallImageContainer = document.querySelector('.portfolio__image--s');
    const largeImageInside = document.querySelector(
      '.portfolio__image--l .image__inside'
    );
    const smallImageInside = document.querySelector(
      '.portfolio__image--s .image__inside'
    );
    const fillBackground = document.querySelector('.fill__background');

    const onMouseEnter = (e: any) => {
      const { color, imagelarge, imagesmall } = e.target.dataset;

      const siblings = links.filter((link) => link !== e.target);

      const tl = gsap.timeline();

      tl.set(largeImageInside, { backgroundImage: `url(${imagelarge})` })
        .set(smallImageInside, {
          backgroundImage: `url(${imagesmall})`,
        })
        .set(e.target, { zIndex: 3 })
        .set(siblings, { zIndex: 0 })
        .to(
          [largeImageContainer, smallImageContainer],
          {
            autoAlpha: 1,
            duration: 1,
          },
          0
        )
        .to(e.target, { color: '#fff' }, 0)
        .to(
          siblings,
          {
            color: '#fff',
            opacity: 0.2,
          },
          0
        )
        .to(
          fillBackground,
          {
            backgroundColor: color,
            ease: 'none',
          },
          0
        );
    };

    const onMouseLeave = () => {
      const tl = gsap.timeline();

      gsap.set(links, { zIndex: 1 });

      tl.to([largeImageContainer, smallImageContainer], {
        autoAlpha: 0,
        duration: 1,
      })
        .to(links, { color: '#000', opacity: 1 }, 0)
        .to(
          fillBackground,
          { backgroundColor: 'rgb(172, 183, 174)', ease: 'none' },
          0
        );
    };

    const onMouseMove = (e: any) => {
      const { clientY } = e;
      const imageY = porfolioContainer.clientHeight - clientY;

      gsap.to(largeImageContainer, {
        y: -imageY / 6,
        duration: 1.2,
        ease: 'power3.out',
      });

      gsap.to(smallImageContainer, {
        duration: 1.5,
        y: -imageY / 3,
        ease: 'power3.out',
      });
    };

    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnter);
      link.addEventListener('mouseleave', onMouseLeave);
      link.addEventListener('mousemove', onMouseMove);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnter);
        link.removeEventListener('mouseleave', onMouseLeave);
        link.removeEventListener('mousemove', onMouseMove);
      });
    };
  }, []);

  return (
    <Wrapper>
      <h2 className='portfolio__heading'>
        <span>002 -</span> Portfolio
      </h2>
      <div className='portfolio__categories'>
        <a
          href='/'
          data-imagelarge='img_portfolio-01-480-720.jpg'
          data-imagesmall='img_portfolio-02-480-720.jpg'
          data-color='#b3a8b3'
        >
          Voluptas & Veritatis
        </a>
        <a
          href='/'
          data-imagelarge='img_portfolio-02-480-720.jpg'
          data-imagesmall='img_portfolio-01-480-720.jpg'
          data-color='#bab6a8'
        >
          Nostrum & Quibusdam
        </a>
        <a
          href='/'
          data-imagelarge='img_portfolio-01-480-720.jpg'
          data-imagesmall='img_portfolio-02-480-720.jpg'
          data-color='#a0abb4'
        >
          Elit & Laudantium
        </a>
        <a
          href='/'
          data-imagelarge='img_portfolio-02-480-720.jpg'
          data-imagesmall='img_portfolio-01-480-720.jpg'
          data-color='#a3b1ae'
        >
          Tatione & Nona
        </a>
        <a
          href='/'
          data-imagelarge='img_portfolio-01-480-720.jpg'
          data-imagesmall='img_portfolio-02-480-720.jpg'
          data-color='#afaba2'
        >
          Accusantium Bold
        </a>
      </div>
      <div className='portfolio__image--l'>
        <div className='image__inside'></div>
      </div>
      <div className='portfolio__image--s'>
        <div className='image__inside'></div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: var(--v-spacing) 0;
  margin-top: var(--v-spacing);
  position: relative;

  .portfolio__heading {
    position: absolute;
    top: 0;
    left: var(--h-gutter);
    margin: 0.83em 0;
    color: var(--text-dark-color);
    font-family: var(--font-headings);
    font-weight: 400;
    font-size: 1.6vw;

    span {
      opacity: 0.4;
    }
  }

  .portfolio__categories {
    display: flex;
    flex-direction: column;

    a {
      margin: auto;
      font-size: 5.4vw;
      font-family: var(--font-headings);
      color: var(--text-dark-color);
      letter-spacing: 0.2vw;
      text-decoration: none;
    }
  }

  .portfolio__image--l,
  .portfolio__image--s {
    position: absolute;
    overflow: hidden;
    background-color: #000;
    pointer-events: none;
    visibility: hidden;
  }

  .portfolio__image--l {
    top: 11vh;
    left: 24vw;
    width: 28vw;
    padding-bottom: 41.66vw;
  }

  .portfolio__image--s {
    width: 15vw;
    top: 25vh;
    left: 54vw;
    padding-bottom: 20vw;
  }

  .image__inside {
    position: absolute;
    top: -10%;
    left: 0;
    width: 100%;
    height: 115%;
    background-size: cover;
    opacity: 0.8;
    z-index: 2;
  }
`;
