import { StyledButton } from './Button.styled';

export const Button = ({ onBtn }) => {
  return (
    <StyledButton>
      <button type="button" onClick={onBtn}>
        Load More
      </button>
    </StyledButton>
  );
};
