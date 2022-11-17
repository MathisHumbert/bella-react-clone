import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import imagesLoaded from 'imagesloaded';

export default function Loader() {
  const loaderRef = useRef(null);
  const loaderContentRef = useRef(null);
  const loaderInnerRef = useRef(null);
  const loaderProgressRef = useRef(null);
  const loaderImageRef = useRef(null);
  const loaderImageMaskRef = useRef(null);
  const loaderTitleMaskFirstRef = useRef(null);
  const loaderTitleMaskSecondRef = useRef(null);
  const loaderFirstLineRef = useRef(null);
  const loaderSecondLineRef = useRef(null);

  useEffect(() => {
    const updateProgress = (value: number) => {
      gsap.to(progressTween, {
        progress: value / imageCount,
        duration: 0.3,
        ease: 'power1.out',
      });
    };

    gsap.set(loaderInnerRef.current, {
      scaleY: 0.005,
      transformOrigin: 'bottom',
      autoAlpha: 1,
    });

    const progressTween = gsap.to(loaderProgressRef.current, {
      scaleX: 0,
      ease: 'none',
      transformOrigin: 'right',
      paused: true,
    });

    let loadedImageCount = 0;
    let imageCount: number;
    const container = document.querySelector('#root')!;

    const imgLoaded = imagesLoaded(container);
    imageCount = imgLoaded.images.length;

    console.log(imageCount);

    updateProgress(0);

    imgLoaded.on('progress', () => {
      loadedImageCount++;

      updateProgress(loadedImageCount);
    });

    imgLoaded.on('done', () => {
      gsap.set(progressTween, { onComplete: initLoader });
    });

    const initLoader = () => {
      const tlLoeaderIn = gsap.timeline({
        defaults: { duration: 1.1, ease: 'power2.out' },
        onComplete: () => {
          tlLoeaderOut.play();
        },
      });
      const tlLoeaderOut = gsap.timeline({
        defaults: { duration: 1.2, ease: 'power2.inOut' },
        paused: true,
      });

      tlLoeaderIn
        .set(loaderContentRef.current, {
          autoAlpha: 1,
        })
        .to(loaderInnerRef.current, {
          scaleY: 1,
          transformOrigin: 'bottom',
          ease: 'power2.inOut',
        })
        .addLabel('revealImage')
        .from(loaderImageMaskRef.current, { yPercent: 100 }, 'revealImage-=0.6')
        .from(loaderImageRef.current, { yPercent: 100 }, 'revealImage-=0.6')
        .from(
          [loaderFirstLineRef.current, loaderSecondLineRef.current],
          { yPercent: 100, stagger: 0.1 },
          'revealImage-=0.4'
        );

      tlLoeaderOut
        .to(
          [loaderTitleMaskFirstRef.current, loaderTitleMaskSecondRef.current],
          {
            yPercent: -400,
            stagger: 0.2,
          }
        )
        .to(
          [loaderRef.current, loaderContentRef.current],
          { yPercent: -100 },
          0
        )
        .from('#main', { y: 150 }, 0);
    };
  }, []);

  return (
    <>
      <LoaderWrapper ref={loaderRef}>
        <div className='loader__mask'>
          <div className='loader__inner' ref={loaderInnerRef}>
            <div className='loader__progress' ref={loaderProgressRef}></div>
          </div>
        </div>
      </LoaderWrapper>
      <LoaderContentWrapper ref={loaderContentRef}>
        <div className='loader__content__inner'>
          <div className='loader__content__title'>
            <div
              className='loader__content__title--mask'
              ref={loaderTitleMaskFirstRef}
            >
              <span ref={loaderFirstLineRef}>Anything</span>
            </div>
            <div
              className='loader__content__title--mask'
              ref={loaderTitleMaskSecondRef}
            >
              <span ref={loaderSecondLineRef}>Is Possible</span>
            </div>
          </div>
          <div className='loader__content__image'>
            <div
              className='loader__content__image--mask'
              ref={loaderImageMaskRef}
            >
              <img
                src='img_landscape-01-large.jpg'
                alt='loader'
                ref={loaderImageRef}
              />
            </div>
          </div>
        </div>
      </LoaderContentWrapper>
    </>
  );
}

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  z-index: 4;

  .loader__mask {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bcg-loaderblue) url('img_logo.svg') no-repeat center;
    background-size: 155px 155px;
    overflow: hidden;
  }

  .loader__inner {
    position: relative;
    width: var(--loader-width);
    height: var(--loader-height);
    background: var(--bcg-loaderbluedark);
  }

  .loader__progress {
    position: absolute;
    left: 0;
    top: 0;
    width: var(--loader-width);
    height: var(--loader-height);
    background-color: var(--bcg-lightblue);
  }
`;

const LoaderContentWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 4;
  background: transparent;
  visibility: hidden;

  .loader__content__inner {
    width: var(--loader-width);
    height: var(--loader-height);
  }

  .loader__content__title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    font-size: 7vw;
    line-height: 8vw;
    font-family: var(--font-headings);
    text-align: center;
    color: var(--text-color);
    z-index: 5;

    &--mask {
      overflow: hidden;
      will-change: transform;
      transform: translateZ(0);
      backface-visibility: hidden;
    }

    span {
      display: block;
    }
  }

  .loader__content__image {
    width: var(--loader-width);
    padding-bottom: 50vh;
    position: relative;
    overflow: hidden;

    &--mask {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

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
`;
