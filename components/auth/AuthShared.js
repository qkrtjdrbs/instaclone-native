import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 18px 5px;
  margin-bottom: 8px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: ${(props) => (props.lastOne ? "10" : 8)}px;
`;
