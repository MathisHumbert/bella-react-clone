import styled from 'styled-components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper id='main'>
      {children}
      <aside
        className='fill__background'
        style={{ backgroundColor: 'rgb(172, 183, 174)' }}
      ></aside>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .fill__background {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    will-change: background-color;
    transition: background-color 0.3s linear;
    z-index: -1;
  }
`;
