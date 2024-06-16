import {
  Flex,
  Box,
  Button,
  VStack,
  Text,
  Image,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import SkeletonView from "./SkeletonView";
import { NavigationContext } from "../Contexts";
import { BASE_URL } from "../common/api";
import { postForm } from "../common/api";
import { useForm } from "react-hook-form";
import ConfirmDialog from "./ConfirmDialog";

function TaskDetail({ openTask, taskDetail }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useState(true);
  const [dialogHeading, setDialogHeading] = useState(true);
  const [approved, setApproval] = useState(false);

  const { openNav } = useContext(NavigationContext);

  useEffect(() => {
    setLoading(false);
  }, []);

  const onBack = () => {
    openTask(false);
    openNav(true);
  };

  const onSubmit = (setuju) => {
    if (setuju) {
      setDialogHeading("Approve Task");
    } else {
      setDialogHeading("Reject Task");
    }
    setApproval(setuju);
    onOpen();
  };

  const onConfirm = () => {
    if (approved) {
      console.log("Approve task");
    } else {
      console.log("Reject task");
    }
    onBack();
  };

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();

  return (
    <>
      {isLoading ? (
        <SkeletonView />
      ) : (
        <>
          <ConfirmDialog isOpen={isOpen} onClose={onClose} onConfirm={onConfirm} title={dialogHeading} />
          <VStack w="100%" h="100%" p={5}>
            <Box w="100%" flex="1">
              <VStack w="100%">
                <Flex gap="20px" w="100%" alignItems="center">
                  <Button
                    borderRadius="full"
                    size="sm"
                    colorScheme="orange"
                    variant="outline"
                    px="1rem"
                    onClick={onBack}
                  >
                    Back
                  </Button>
                  <Text fontWeight="semibold" fontSize="lg">
                    Task Detail
                  </Text>
                </Flex>
              </VStack>
              <Flex p={3} w="100%" justifyContent="center">
                <Image
                  src={`${BASE_URL}file/open/D3oMc6JhtW8SqLrZIKAQzXFfR42sEPvCm9ygN7TG`}
                  alt="Loading..."
                  w="80%"
                />
              </Flex>
              <FormControl mb={2}>
                <FormLabel>Pesan</FormLabel>
                <Input
                  type="text"
                  readOnly={true}
                  focusBorderColor="orange.400"
                  value={taskDetail?.keterangan}
                />
              </FormControl>
              <FormControl isInvalid={errors.ket}>
                <FormLabel>Nominal</FormLabel>
                <Input
                  type="text"
                  {...register("ket")}
                  onBlur={() => trigger("ket")}
                  focusBorderColor="orange.400"
                />
                <FormErrorMessage>
                  {errors.ket && errors.ket.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <VStack gap=".5rem" w="100%">
              <Button
                borderRadius="full"
                w="100%"
                colorScheme="red"
                onClick={() => onSubmit(false)}
              >
                Reject
              </Button>
              <Button
                borderRadius="full"
                w="100%"
                colorScheme="blue"
                isLoading={isLoading}
                onClick={() => onSubmit(true)}
              >
                Approve
              </Button>
            </VStack>
          </VStack>
        </>
      )}
    </>
  );
}

export default TaskDetail;
