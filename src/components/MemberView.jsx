import {
  Button,
  Box,
  Flex,
  Text,
  VStack,
  Card,
  CardBody,
  Divider,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BellIcon, CalendarIcon, Search2Icon } from "@chakra-ui/icons";

const MemberView = ({ members }) => {

  function formatDate(dateTime) {
    let dateOnly = dateTime.replace(/\s\d{2}:\d{2}:\d{2}/, "");
    return dateOnly;
  }

  return (
    <VStack w="100%" p={5} pt="2rem">
      <Flex w="100%" gap="15px">
        <Flex
          backgroundColor="orange"
          w={10}
          h={10}
          alignItems="center"
          justifyContent="center"
          borderRadius="xl"
        >
          <Search2Icon boxSize={6} color="#fff" />
        </Flex>
        <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">
          Daftar Member
        </Text>
      </Flex>

      {members && members.length > 0 ? (
        <Stack spacing="2" width="100%">
          {members.map((item) => (
            <Card
              w="100%"
              variant="outline"
              border="none"
              borderRadius="3xl"
              key={item.id}
            >
              <CardBody>
                <Flex justifyContent="space-between">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      {item?.nama_lengkap}
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Since {formatDate(item.created_at)}
                    </Text>
                  </Box>
                  <Flex alignItems="center">
                    <Text textColor="blue.300" fontWeight="semibold">
                      {item?.status}
                    </Text>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Stack>
      ) : (
        <Text textAlign="center" textColor="gray.600" fontStyle="italic">
          No data
        </Text>
      )}
    </VStack>
  );
};
export default MemberView;
