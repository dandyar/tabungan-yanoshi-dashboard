import { Text } from "@chakra-ui/react";

function GreetingText () {
    const date = new Date();
    const hour = date.getHours();
  
    let greeting;
    if (hour < 12) {
      greeting = "Selamat pagi";
    } else if (hour < 18) {
      greeting = "Selamat sore";
    } else {
      greeting = "Selamat malam";
    }
  
    return (
      <Text fontSize="sm" w="100%">
        {greeting + ","}
      </Text>
    );
  }
  
  export default GreetingText;