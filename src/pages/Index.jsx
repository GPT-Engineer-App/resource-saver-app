import { Box, Button, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const backgrounds = ["backgrounds/tech1.jpg", "backgrounds/tech2.jpg", "backgrounds/tech3.jpg"];

const Index = () => {
  const [background, setBackground] = useState("");

  useEffect(() => {
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackground(randomBackground);
  }, []);

  return (
    <Box height="100vh" bgImage={`url(${background})`} bgSize="cover" bgPosition="center">
      <Flex direction="column" align="center" justify="center" height="100%">
        <Heading as="h1" size="2xl" color="white" mb={6}>Trình quản lý tài nguyên cá nhân</Heading>
        <Text fontSize="xl" color="white" mb={4}>Lưu trữ và quản lý các tài nguyên quan trọng của bạn</Text>
        <Flex>
          <Link as={RouterLink} to="/urls" style={{ textDecoration: 'none' }}>
            <Button colorScheme="teal" m={2}>URL</Button>
          </Link>
          <Link as={RouterLink} to="/keys" style={{ textDecoration: 'none' }}>
            <Button colorScheme="teal" m={2}>Khóa</Button>
          </Link>
          <Link as={RouterLink} to="/notes" style={{ textDecoration: 'none' }}>
            <Button colorScheme="teal" m={2}>Ghi chú</Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Index;