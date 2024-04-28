import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
import styled from "styled-components";

import { items } from "./TestimonialData";

const CARD_WIDTH = 350;
const CARD_HEIGHT = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const Testimonials = () => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (items.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) {
      return;
    }
    setOffset((pv) => (pv += CARD_SIZE));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) {
      return;
    }
    setOffset((pv) => (pv -= CARD_SIZE));
  };
  return (
    <section ref={ref}>
      <Container>
        <CardContainer>
          <Title>
            Everything. <Subtitle>Yes, even that.</Subtitle>
          </Title>
          <FlexContainer animate={{ x: offset }}>
            {items.map((item) => {
              return <Card key={item.id} {...item} />;
            })}
          </FlexContainer>
        </CardContainer>

        <>
          <CarouselButton
            initial={false}
            animate={{
              x: CAN_SHIFT_LEFT ? "0%" : "-100%",
            }}
            left
            onClick={shiftLeft}
          >
            <FiChevronLeft />
          </CarouselButton>
          <CarouselButton
            initial={false}
            animate={{
              x: CAN_SHIFT_RIGHT ? "0%" : "100%",
            }}
            onClick={shiftRight}
          >
            <FiChevronRight />
          </CarouselButton>
        </>
      </Container>
    </section>
  );
};



const CarouselButton = styled(motion.button)`
  border: none;
  position: absolute;
  top: 60%;
  background-color: rgba(240, 244, 250, 0.3);
  border-radius: ${({ left }) => (left ? "0 10px 10px 0" : "10px 0 0 10px")};
  padding: 1rem;
  font-size: 2rem;
  color: white;
  transition: padding 0.2s;

  &:hover {
    padding: ${({ left }) =>
      left ? "1rem 1.5rem 1rem 1rem" : "1rem 1rem 1rem 1.5rem"};
  }

  ${({ left }) => (left ? "left: 0;" : "right: 0;")}
  z-index: 30;
`;



const Container = styled.div`
  position: relative;
  overflow: hidden;
  padding: 1rem;
  margin-top: 5rem;

  font-family: "Inter", sans-serif;
`;

const CardContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 90%;

  @media (max-width: 48rem) {
    max-width: 100%;
  }
`;

const Title = styled.p`
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 600;

  @media (max-width: 48rem) {
    font-size: 1.5rem;
  
  }
`;

const Subtitle = styled.span`
  color: #718096;
`;

const FlexContainer = styled(motion.div)`
  display: flex;
`;

const Card = ({ url, category, title, description }) => {
  return (
    <CardWrapper
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: MARGIN,
        backgroundImage: `url(${url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <CardTextContainer>
        <Category>{category}</Category>
        <CardTitle>{title}</CardTitle>
        <Description>{description}</Description>
      </CardTextContainer>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  position: relative;
  flex-shrink: 0; /* Equivalent to shrink-0 */
  cursor: pointer;
  border-radius: 1rem; /* Equivalent to rounded-2xl */
  background-color: white; /* Equivalent to bg-white */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Equivalent to shadow-md */
  transition: all 0.3s;

  &:hover {
    transform: scale(1.015); /* Equivalent to hover:scale-[1.015] */
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); /* Equivalent to hover:shadow-xl */
  }
`;

const CardTextContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  border-radius: 1rem; /* Equivalent to rounded-2xl */
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.6) 60%,
    rgba(0, 0, 0, 0) 90%
  );
  padding: 1.5rem; /* Equivalent to p-6 */
  color: white;
  transition: backdrop-filter 0.3s;

  &:hover {
    backdrop-filter: blur(4px); /* Equivalent to hover:backdrop-blur-sm */
  }
`;

const Category = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #9f7aea;
  margin: 0.5rem 0;

  letter-spacing: 0.05em;
  line-height: 1;
  display: inline-block;
`;

const CardTitle = styled.p`
  margin: 0.5rem 0;
  font-size: 1.875rem;
  font-weight: 700;

  @media (max-width: 48rem) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: #718096;

  @media (max-width: 48rem) {
    font-size: 1rem;
  }
`;
export default Testimonials;
