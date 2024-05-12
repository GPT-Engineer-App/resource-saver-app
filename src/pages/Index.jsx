import { Box, Flex, Heading, Link, Image } from "@chakra-ui/react";
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
    <Flex direction="column" align="center" justify="center" minHeight="100vh" bgImage={`url(${background})`} bgSize="cover">
      <Heading as="h1" size="2xl" color="white">Personal Resource App</Heading>
      <Box mt={10}>
        <Link as={RouterLink} to="/urls" p={2} bg="blue.500" color="white">Manage URLs</Link>
        <Link as={RouterLink} to="/keys" p={2} bg="green.500" color="white" ml={2}>Manage Keys</Link>
        <Link as={RouterLink} to="/notes" p={2} bg="red.500" color="white" ml={2}>Manage Notes</Link>
      </Box>
    </Flex>
  );
};

export default Index;