import {
  Box,
  Button,
  Text,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { postFormData } from "../common/api";
import { useForm } from "react-hook-form";

const UploadView = ({ onSwitchScreen }) => {
  const toast = useToast();

  const [isLoading, setLoading] = useState(false);

  const onClose = () => {
    onSwitchScreen("home");
  };

  const validateFiles = (value) => {
    if (value.length < 1) {
      return "Files is required";
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size 10mb";
      }
    }
    return true;
  };

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const data = getValues();

      if ((!data.attachment || data.attachment.length === 0)) {
        throw new Error("Silakan upload file terlebih dahulu");
      }
      setLoading(true);
      Object.keys(data).forEach((key) => {
        if (key === "attachment") {
          formData.append("attachment", data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      });
      const response = await postFormData("store", formData);
      if (response.ok) {
        toast({
          position: "top",
          title: 'Bukti transfer telah berhasil dikirim',
          status: "success",
          isClosable: true,
        });
        onClose();
      } else {
        const responseJSON = await response.json();
        toast({
          position: "top",
          title: responseJSON.responseMessage,
          status: "error",
          isClosable: true,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to submit form data", error);
      toast({
        position: "top",
        title: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <VStack
        h="100%"
        gap="3rem"
        textAlign="center"
        padding={5}
        justifyContent="space-between"
      >
        <Box>
          <Box marginBottom="2rem">
            <Text fontSize="2xl" fontWeight="bold" mb=".5rem">
              Bukti Transfer
            </Text>
            <Text fontSize="md" color="gray.600">
              Silakan unggah bukti transfer untuk memproses pembayaran
            </Text>
          </Box>
          <VStack gap='1rem'>
            <FileUpload
              accept={"image/*"}
              register={register("attachment", { validate: validateFiles })}
            ></FileUpload>
            <FormControl isInvalid={errors.ket}>
              <FormLabel>Catatan</FormLabel>
              <Input
                type="text"
                {...register("ket")}
                onBlur={() => trigger("ket")}
                size="lg"
                focusBorderColor="orange.400"
              />
              <FormErrorMessage>
                {errors.ket && errors.ket.message}
              </FormErrorMessage>
            </FormControl>
          </VStack>
        </Box>
        <VStack gap="1rem" w="100%">
          <Button
            borderRadius="full"
            w="100%"
            size="lg"
            colorScheme="orange"
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            borderRadius="full"
            w="100%"
            size="lg"
            colorScheme="orange"
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Upload
          </Button>
        </VStack>
      </VStack>
  );
};
export default UploadView;
