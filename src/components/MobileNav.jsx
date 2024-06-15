import React, { useContext } from "react";
import {
  Button,
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { BellIcon, CalendarIcon, Search2Icon } from "@chakra-ui/icons";
import { NavigationContext } from "../Contexts";

const MobileNav = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const iconColor = useColorModeValue("gray.600", "gray.300");
  const { currentScreen, handleScreenChange } = useContext(NavigationContext);

  const navItems = [
    { icon: <BellIcon />, target: "tasks", label: "Tasks" },
    { icon: <CalendarIcon />, target: "dashboard", label: "Analytics" },
    { icon: <Search2Icon />, target: "users", label: "Users" },
  ];

  const handleClick = (target) => {
    console.log(currentScreen);
    handleScreenChange(target);
  };

  return (
    <Box width="100%" bg={bgColor}>
      <Flex justify="space-around" padding="10px 0">
        {navItems.map((item, index) => (
          <Stack key={index} align="center">
            <Button
              key={index}
              variant="ghost"
              size="lg"
              flexDirection="column"
              color={iconColor}
              _hover={{ color: "orange.600" }}
              _active={{
                bg: 'transparent',
                textColor: 'orange.500',
              }}
              onClick={() => handleClick(item.target)}
              isActive={currentScreen === item.target}
              gap='5px'
            >
              {item.icon}
              <Text fontSize="sm">{item.label}</Text>
            </Button>
          </Stack>
        ))}
      </Flex>
    </Box>
  );
};

export default MobileNav;
