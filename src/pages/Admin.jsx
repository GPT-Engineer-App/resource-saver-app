import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

const Admin = () => {
  return (
    <Box p={5} m={3} bg="gray.800" color="white" borderRadius="lg">
      <Heading mb={4}>Admin Dashboard</Heading>
      <Flex direction="column" align="center" justify="center">
        <Text fontSize="lg" mb={3}>Manage Application Settings</Text>
        <Button colorScheme="purple" m={2}>Manage Users</Button>
        <Button colorScheme="purple" m={2}>System Logs</Button>
        <Button colorScheme="purple" m={2}>Database Settings</Button>
      </Flex>
    </Box>
  );
};

export default Admin;