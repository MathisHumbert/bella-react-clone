import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  side: 'left' | 'right';
  color: 'white' | 'black';
  headingNumber: string;
  headingSection: string;
  heading: string;
  paragraph: string;
};

export default function Blog({
  side,
  color,
  headingNumber,
  headingSection,
  heading,
  paragraph,
}: Props) {
  const blogRef = useRef(null);
  const blogImgRef = useRef(null);

  useEffect(() => {
    const parallax = gsap.to(blogImgRef.current, {
      yPercent: 20,
      ease: 'none',
    });

    ScrollTrigger.create({
      animation: parallax,
      trigger: blogRef.current,
      start: 'top bottom',
      scrub: 1,
    });
  }, []);

  return (
    <Wrapper side={side} color={color}>
      <h2 className='blog__heading'>
        <span>{headingNumber}</span> {headingSection}
      </h2>
      <div className='blog__post' ref={blogRef}>
        <div className='blog__post__image'>
          <img src='img_portfolio-02-480-720.jpg' alt='blog' ref={blogImgRef} />
        </div>
        {side === 'left' ? (
          <div className='blog__post__text'>
            <p>{paragraph}</p>
            <h3>{heading}</h3>
          </div>
        ) : (
          <div className='blog__post__text'>
            <h3>{heading}</h3>
            <p>{paragraph}</p>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section<{
  side: 'left' | 'right';
  color: 'white' | 'black';
}>`
  position: relative;
  padding-bottom: var(--v-spacing);
  color: ${(props) =>
    props.color === 'white' ? 'var(--text-color)' : 'var(--text-dark-color)'};

  .blog__heading {
    margin: 0 var(--h-gutter) var(--v-spacing) var(--h-gutter);
    font-family: var(--font-headings);
    font-weight: 400;

    span {
      opacity: 0.4;
    }
  }

  .blog__post__image {
    position: relative;
    margin: ${(props) =>
      props.side === 'left' ? ' 0 50% 0 16.6%' : ' 0 16.6% 0 50%'};
    padding-bottom: 50%;
    overflow: hidden;

    img {
      position: absolute;
      left: 0;
      top: -20%;
      width: 100%;
      height: 120%;
      object-fit: cover;
      object-position: 50% 50%;
      will-change: transform;
    }
  }

  .blog__post__text {
    position: absolute;
    top: calc(50% + (var(--v-spacing) / 2));
    left: ${(props) =>
      props.side === 'left' ? 'calc(50vw + var(--h-gutter))' : '16.6%'};
    right: ${(props) =>
      props.side === 'left'
        ? 'calc(var(--h-gutter) * 4)'
        : 'calc(50vw + var(--h-gutter))'};
    transform: translateY(-50%);

    p {
      margin: 1em 0;
      font-size: 1.6vw;
      opacity: 0.6;
    }

    h3 {
      font-size: 3.6vw;
      font-family: var(--font-headings);
      line-height: 1.19;
      font-weight: 400;
      letter-spacing: 0.2vw;
      margin: 1em 0;
    }
  }
`;
