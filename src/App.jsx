import { Route, BrowserRouter as Router, Routes, Link as RouterLink } from "react-router-dom";
import { Box, Flex, Link } from "@chakra-ui/react";
import Index from "./pages/Index.jsx";

function App() {
  return (
    <Router>
      <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem" bg="brand.900" color="white" position="sticky" top="0" zIndex="1000">
        <Box p="2">
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>Home</Link>
        </Box>
        <Box p="2">
          <Link as={RouterLink} to="/urls" _hover={{ textDecoration: 'none' }}>URLs</Link>
        </Box>
        <Box p="2">
          <Link as={RouterLink} to="/keys" _hover={{ textDecoration: 'none' }}>Keys</Link>
        </Box>
        <Box p="2">
          <Link as={RouterLink} to="/notes" _hover={{ textDecoration: 'none' }}>Notes</Link>
        </Box>
      </Flex>
      <Routes>
        <Route exact path="/" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;