import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import { destroy } from "../common/api";

const SettingsView = () => {
  const onDestroy = async () => {
    const res = await destroy("auth/signout");
    if (res.ok) {
      window.location.reload();
    }
  };

  function formatDate(dateTime) {
    let dateOnly = dateTime.replace(/\s\d{2}:\d{2}:\d{2}/, "");
    return dateOnly;
  }

  return (
    <Box p={5} pt="2rem">
      <VStack w="100%" mb={5}>
        <Flex w="100%" gap="15px">
          <Flex
            backgroundColor="orange"
            w={10}
            h={10}
            alignItems="center"
            justifyContent="center"
            borderRadius="xl"
          >
            <SettingsIcon boxSize={6} color="#fff" />
          </Flex>
          <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">
            Pengaturan
          </Text>
        </Flex>
      </VStack>

      <Button borderRadius="full" w="20%" colorScheme="red" onClick={onDestroy}>
        Sign out
      </Button>
    </Box>
  );
};
export default SettingsView;
