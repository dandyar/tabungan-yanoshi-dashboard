import React, { useContext } from "react";
import {
  Button,
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  BellIcon,
  CalendarIcon,
  Search2Icon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { NavigationContext } from "../Contexts";

const MobileNav = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const iconColor = useColorModeValue("gray.600", "gray.300");
  const { currentScreen, handleScreenChange, navOpened } =
    useContext(NavigationContext);

  const navItems = [
    { icon: <BellIcon />, target: "tasks", label: "Tasks" },
    { icon: <CalendarIcon />, target: "dashboard", label: "Analytics" },
    { icon: <Search2Icon />, target: "users", label: "Members" },
    { icon: <SettingsIcon />, target: "settings", label: "Settings" },
  ];

  return (
    <>
      {navOpened && (
        <Box
          width="245px"
          height="100%"
          bg={bgColor}
          position="fixed"
          left="0"
          bottom="0"
          padding={5}
        >
          {navItems.map((item, index) => (
            <Flex key={index} align="center">
              {item.icon}
              <Button
                key={index}
                variant="ghost"
                size="lg"
                flexDirection="column"
                color={iconColor}
                _hover={{ color: "orange.600" }}
                _active={{
                  bg: "transparent",
                  textColor: "orange.500",
                }}
                onClick={() => handleScreenChange(item.target)}
                isActive={currentScreen === item.target}
                gap="5px"
              >
                <Text fontSize="sm">{item.label}</Text>
              </Button>
            </Flex>
          ))}
        </Box>
      )}
    </>
  );
};

export default MobileNav;
