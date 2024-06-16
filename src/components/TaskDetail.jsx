import { Flex, Button, VStack, Text } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import SkeletonView from "./SkeletonView";
import { NavigationContext } from "../Contexts";

function TaskDetail({ openTask }) {
  const [isLoading, setLoading] = useState(true);

  const { openNav } = useContext(NavigationContext);

  useEffect(() => {
    setLoading(false);
  }, []);

  const onBack = () => {
    openTask(false);
    openNav(true);
  }

  return (
    <>
      {isLoading ? (
        <SkeletonView />
      ) : (
        <VStack w="100%" p={5}>
          <VStack w="100%">
            <Flex gap='20px' w='100%' alignItems='center'>
              <Button
                borderRadius="full"
                size="sm"
                colorScheme="orange"
                variant="outline"
                px="1rem"
                onClick={ onBack }
              >
                Back
              </Button>
              <Text fontWeight='semibold' fontSize="lg">Task Detail</Text>
            </Flex>
          </VStack>
          <VStack gap=".85rem" w="100%">
            <Button borderRadius="full" w="100%" size="lg" colorScheme="red">
              Reject
            </Button>
            <Button
              borderRadius="full"
              w="100%"
              size="lg"
              colorScheme="blue"
              isLoading={isLoading}
            >
              Approve
            </Button>
          </VStack>
        </VStack>
      )}
    </>
  );
}

export default TaskDetail;
