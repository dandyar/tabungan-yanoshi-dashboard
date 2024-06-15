import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import MobileNav from "./MobileNav";

const MobileView = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="#f9f7f1"
    >
      <Box
        width={{ base: "100vw", md: "480px" }} // Full width on small screens, fixed width on medium and larger screens
        height="100vh" // Height of a common mobile screen
        boxShadow="lg"
      >
        <VStack height="100%" gap='0'>
          <Box w='100%' flex="1" overflow="hidden">
            <Box height="100%" overflow="auto">
              {children}
            </Box>
          </Box>
          <MobileNav />
        </VStack>
      </Box>
    </Box>
  );
};
export default MobileView;
