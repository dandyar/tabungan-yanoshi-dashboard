import {
  Flex,
  Skeleton,
  VStack
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function SkeletonView() {
  return (
    <VStack padding={5} paddingTop="2rem" alignItems='start'>
        <Flex w="100%" justifyContent="space-between">
          <Skeleton height="21px" width="100px" />
          <Skeleton height="21px" width="200px" />
        </Flex>
        <Skeleton height="36px" width="100%" />
        <Skeleton height="126px" width="100%" />
        
      </VStack>
  );
}

export default SkeletonView;
