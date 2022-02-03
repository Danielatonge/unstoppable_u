import { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "./Icon";

const BackButton = styled.TouchableOpacity<{ active: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: #000;
  border-radius: 50px;
  margin-left: 10px;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
`;

interface ComposeActionProps {
  iconName: string;
  setState?: (value: any) => void;
  action?(): void;
}

export const ComposeAction = ({
  iconName,
  setState,
  action,
}: ComposeActionProps) => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    setActive(false);
  }, []);

  useEffect(() => {
    if (setState) setState(active);
  }, [active]);

  const handleClick = () => {
    setActive(!active);
    if (action) action();
  };

  return (
    <BackButton
      active={active}
      onPress={() => handleClick()}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Icon name={iconName} color={"#fff"} style={{ margin: 10 }} size={20} />
    </BackButton>
  );
};
