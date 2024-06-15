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
import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import MobileView from "./MobileView";
import GreetingText from "./GreetingText";
import { get } from "../common/api";

const HomeView = ({ onSwitchScreen, user, activeRequest, report }) => {
  const onReport = () => {
    onSwitchScreen("upload");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  function formatAmount(number) {
    return number.replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ",");
  }

  return (
    <VStack w='100%' padding={5} paddingTop="2rem">
      <Box w="100%">
        <Text fontSize="2xl" fontWeight='bold' marginBottom="1rem">
          Pending Task
        </Text>

        {report && report.length > 0 ? (
          <Stack spacing="2">
            {report.map((item) => (
              <Card
                w="100%"
                variant="outline"
                border="none"
                borderRadius="3xl"
                key={item.id}
              >
                <CardBody>
                  <Box>
                    <Heading
                      size="xs"
                      textTransform="uppercase"
                      textColor="green.300"
                    >
                      + IDR {formatAmount(item.credit_amount)}
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {item.created_at}
                    </Text>
                  </Box>
                </CardBody>
              </Card>
            ))}
          </Stack>
        ) : (
          <Text textAlign="center" textColor="gray.600" fontStyle="italic">
            No data
          </Text>
        )}
      </Box>
    </VStack>
  );
};
export default HomeView;
