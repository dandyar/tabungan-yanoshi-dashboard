import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Text,
  useColorModeValue,
  HStack,
  InputGroup,
} from "@chakra-ui/react";

const FileUpload = (props) => {
  const { register, accept, multiple } = props;
  const inputRef = useRef(null);
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const [previewUrl, setPreviewUrl] = useState(null);

  // Destructuring 'ref' out of 'register' and capturing the remaining properties as 'rest'.
  const { ref, ...rest } = register;

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      if (rest.onChange) {
        rest.onChange(event);
      }
    }
  };

  const uploadArea = (
    <HStack
      bg="rgba(22, 142, 223, 0.05)"
      spacing={4}
      p={3}
      borderWidth="2px"
      borderStyle="dashed"
      borderColor={borderColor}
      borderRadius="md"
      w="100%"
      h="265px"
      alignItems="center"
      justifyContent="center"
    >
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%", maxHeight: "100%" }} />
      ) : (
        <>
          <Button
            as="label"
            htmlFor="file-upload"
            size="md"
            colorScheme="teal"
            bgGradient="linear(to-r, orange.300, orange.500)"
            _hover={{
              bgGradient: "linear(to-r, orange.400, orange.600)",
            }}
          >
            Select file
          </Button>
          <Text fontSize="md" color="#A2BACF">
            Upload file here
          </Text>
        </>
      )}
    </HStack>
  );

  return (
    <InputGroup onClick={handleClick}>
      <input
        type="file"
        multiple={!!multiple} // Ensuring 'multiple' is a boolean
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        onChange={handleFileChange}
      />
      {uploadArea}
    </InputGroup>
  );
};

FileUpload.propTypes = {
  register: PropTypes.shape({
    ref: PropTypes.func.isRequired,
  }).isRequired,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
};

export default FileUpload;
