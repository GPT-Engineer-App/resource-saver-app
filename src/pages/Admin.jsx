import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

const Admin = () => {
  return (
    <Box p={5} m={3} bg="gray.800" color="white" borderRadius="lg">
      <Heading mb={4}>Bảng điều khiển quản trị</Heading>
      <Flex direction="column" align="center" justify="center">
        <Text fontSize="lg" mb={3}>Quản lý cài đặt ứng dụng</Text>
        <Button colorScheme="purple" m={2}>Quản lý người dùng</Button>
        <Button colorScheme="purple" m={2}>Nhật ký hệ thống</Button>
        <Button colorScheme="purple" m={2}>Cài đặt cơ sở dữ liệu</Button>
      </Flex>
    </Box>
  );
};

export default Admin;