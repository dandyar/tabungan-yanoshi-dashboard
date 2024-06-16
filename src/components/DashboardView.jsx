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
import React, { useState, useEffect } from "react";
import MobileView from "./MobileView";
import GreetingText from "./GreetingText";
import { get } from "../common/api";

const Dashboard = ({ profile }) => {

  const [dashboard, setDashboard] = useState({
    total_amount: 0,
    active_requests: 0,
    member_count: 0
  });

  const getDashboard = async () => {
    try {
      console.log("update dashboard");
      const getRequest = await get("mgmt/dashboard");
      const response = await getRequest.json();
      setDashboard(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    getDashboard();
  }, []);

  function formatAmount(number) {
    return number.replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ",");
  }
  

  return (
    <VStack padding={5} paddingTop="2rem">
      <Flex w="100%" justifyContent="space-between">
        <GreetingText />
        <Text textAlign="right" fontSize="sm" w="100%">
          {profile?.email}
        </Text>
      </Flex>
      <Text fontSize="2xl" w="100%" fontWeight="semibold" marginBottom="1rem">
        {profile?.nama_lengkap}
      </Text>
      <Card
        variant="outline"
        border="none"
        w="100%"
        p={5}
        mb=".5rem"
        paddingBottom={2}
        borderRadius="3xl"
      >
        <Stat marginBottom=".5rem" display="flex" alignItems="center">
          <StatLabel>Total Amount</StatLabel>
          <StatNumber>
            IDR{" "}
            {dashboard.total_amount
              ? formatAmount(dashboard.total_amount)
              : "0.00"}
          </StatNumber>
        </Stat>
      </Card>

      <Flex w="100%" gap="15px;">
        <Card
          variant="outline"
          border="none"
          w="100%"
          marginBottom="1rem"
          p={5}
          paddingBottom={2}
          borderRadius="3xl"
        >
          <Stat marginBottom=".5rem" display="flex" alignItems="center">
            <StatLabel>Active Requests</StatLabel>
            <StatNumber>{dashboard.active_requests}</StatNumber>
          </Stat>
        </Card>
        <Card
          variant="outline"
          border="none"
          w="100%"
          marginBottom="1rem"
          p={5}
          paddingBottom={2}
          borderRadius="3xl"
        >
          <Stat marginBottom=".5rem" display="flex" alignItems="center">
            <StatLabel>Members</StatLabel>
            <StatNumber>{dashboard.member_count}</StatNumber>
          </Stat>
        </Card>
      </Flex>
    </VStack>
  );
};
export default Dashboard;
