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
    <Box p={[3, 4, 5]} m={[2, 3, 4]} bg="white" boxShadow="xl" borderRadius="lg">
      <Text fontSize="2xl" mb={4}>Manage Your URLs</Text>
      <Input
        placeholder="Add new URL"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        mb={4} p={2}
      />
      <Button onClick={addUrl} colorScheme="blue" width={['full', 'auto']} m={3} p={2}>Add URL</Button>
      {error && <Text color="red.500">{error}</Text>}
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={4}>
        {urls.map(url => (
          <GridItem key={url.id} bg="white" boxShadow="xl" p={4} borderRadius="lg">
            <Image src="https://via.placeholder.com/150" alt="URL Image" mb={4} />
            <Text fontSize="lg">{url.url}</Text>
            <Button colorScheme="red" onClick={() => deleteUrl(url.id)}>Delete</Button>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Urls;