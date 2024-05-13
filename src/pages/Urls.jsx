import { Box, Button, Input, Text, Grid, GridItem, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { client } from "lib/crud";

const Urls = () => {
  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const data = await client.getWithPrefix("url:");
        if (data) {
          setUrls(data.map(item => ({ id: item.key, url: item.value.url })));
        }
      } catch (err) {
        setError("Failed to fetch URLs.");
      }
    };
    fetchUrls();
  }, []);

  const addUrl = async () => {
    const key = `url:${Date.now()}`;
    try {
      const success = await client.set(key, { url: newUrl });
      if (success) {
        setUrls([...urls, { id: key, url: newUrl }]);
        setNewUrl("");
      }
    } catch (err) {
      setError("Failed to add URL.");
    }
  };

  const deleteUrl = async (id) => {
    try {
      const success = await client.delete(id);
      if (success) {
        setUrls(urls.filter(url => url.id !== id));
      }
    } catch (err) {
      setError("Failed to delete URL.");
    }
  };

  return (
    <Box p={[3, 4, 5]} m={[2, 3, 4]} bg="lightblue" boxShadow="xl" borderRadius="lg">
      <Text fontSize="2xl" mb={4} fontFamily="Arial, sans-serif">Manage Your URLs</Text>
      <Input
        placeholder="Add new URL"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        mb={4} p={4} size="lg"
      />
      <Button onClick={addUrl} colorScheme="teal" width={['full', 'auto']} m={3} p={3} _hover={{ bg: "teal.600" }}>Add URL</Button>
      {error && <Text color="red.500">{error}</Text>}
      <Grid templateColumns="repeat(3, 1fr)" gap={8} mt={4}>
        {urls.map(url => (
          <GridItem key={url.id} bg="white" boxShadow="2xl" p={5} borderRadius="lg">
            <Image src="https://via.placeholder.com/150" alt="URL Image" mb={4} />
            <Text fontSize="lg">{url.url}</Text>
            <Button colorScheme="red" onClick={() => deleteUrl(url.id)} _hover={{ bg: "red.600" }}>Delete</Button>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Urls;