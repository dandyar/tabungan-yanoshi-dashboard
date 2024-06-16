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
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SkeletonView from "./SkeletonView";
import { BASE_URL } from "../common/api";
import { postForm } from "../common/api";
import { useForm } from "react-hook-form";
import ConfirmDialog from "./ConfirmDialog";

function TaskDetail({ onBack, taskDetail }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useState(true);
  const [dialogHeading, setDialogHeading] = useState(true);
  const [approved, setApproval] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);

  const onSubmit = async (setuju) => {
    const result = await trigger();
    if (!result) {
      return;
    }
    if (setuju) {
      setDialogHeading("Approve Task");
    } else {
      setDialogHeading("Reject Task");
    }
    setApproval(setuju);
    onOpen();
  };

  const onConfirm = async (event) => {
    event.preventDefault();
    try {
      const result = await trigger();
      if (!result) {
        return;
      }
      setLoading(true);
      let response;
      if (approved) {
        response = await postForm(`mgmt/approve/${taskDetail.id}`, getValues());
      } else {
        response = await postForm(`mgmt/reject/${taskDetail.id}`, getValues());
      }
      if (response.ok) {
        toast({
          position: "top",
          title: "Perubahan berhasil disimpan.",
          status: "success",
          isClosable: true,
        });
        onBack();
      } else {
        toast({
          position: "top",
          title: "Terjadi kesalahan saat memproses data.",
          status: "error",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        position: "top",
        title: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (event) => {};

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
          <ConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title={dialogHeading}
          />
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
                  src={`${BASE_URL}file/open/${taskDetail.file_id}`}
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
              <FormControl isInvalid={errors.amount}>
                <FormLabel>Nominal</FormLabel>
                <Input
                  type="text"
                  {...register("amount", {
                    required: "Nominal tidak boleh kosong",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Nominal harus berupa angka",
                    },
                  })}
                  onBlur={() => trigger("amount")}
                  focusBorderColor="orange.400"
                />
                <FormErrorMessage>
                  {errors.amount && errors.amount.message}
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
