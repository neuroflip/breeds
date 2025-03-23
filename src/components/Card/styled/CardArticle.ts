import styled from "styled-components";

const CardArticle = styled.article`
  width: auto;
  max-width: 600px;
  height: 100%;
  margin: 25px;
  border-radius: 15px;
  background-color: var(--tertiary);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 15px;

  @media (min-width: 768px) {
      width: 90%;
  }
`;

export default CardArticle