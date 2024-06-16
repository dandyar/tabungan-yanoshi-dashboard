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
import React, { useContext, useState } from "react";
import { BellIcon, CalendarIcon, Search2Icon } from "@chakra-ui/icons";
import TaskDetail from "./TaskDetail";
import { NavigationContext } from "../Contexts";

const HomeView = ({ tasks }) => {
  const [taskOpened, openTask] = useState(null);
  const [taskDetail, setTaskDetail] = useState(false);
  const { openNav } = useContext(NavigationContext);

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

  const showTaskDetail = (task) => {
    console.log("open task: " + task.id);
    setTaskDetail(task);
    openTask(true);
    openNav(false);
  };

  return (
    <>
      {taskOpened ? (
        <TaskDetail openTask={openTask} taskDetail={taskDetail} />
      ) : (
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
              <BellIcon boxSize={6} color="#fff" />
            </Flex>
            <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">
              Pending Task
            </Text>
          </Flex>

          {tasks && tasks.length > 0 ? (
            <Stack spacing="2" width="100%">
              {tasks.map((item) => (
                <Card
                  w="100%"
                  variant="outline"
                  border="none"
                  borderRadius="3xl"
                  key={item.id}
                >
                  <CardBody onClick={() => showTaskDetail(item)}>
                    <Flex justifyContent="space-between">
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Bukti transfer
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {item?.created_at}
                        </Text>
                      </Box>
                      <Flex alignItems="center">
                        <Text textColor="blue.300" fontWeight="semibold">
                          PENDING
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
      )}
    </>
  );
};
export default HomeView;
