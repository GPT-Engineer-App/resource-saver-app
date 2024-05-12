import { Box, Button, Input, List, ListItem, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { client } from "lib/crud";

const Urls = () => {
  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    const fetchUrls = async () => {
      const data = await client.getWithPrefix("url:");
      if (data) {
        setUrls(data.map(item => ({ id: item.key, url: item.value.url })));
      }
    };
    fetchUrls();
  }, []);

  const addUrl = async () => {
    if (newUrl) {
      const key = `url:${Date.now()}`;
      const success = await client.set(key, { url: newUrl });
      if (success) {
        setUrls([...urls, { id: key, url: newUrl }]);
        setNewUrl("");
      }
    }
  };

  const deleteUrl = async (id) => {
    const success = await client.delete(id);
    if (success) {
      setUrls(urls.filter(url => url.id !== id));
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Manage URLs</Text>
      <Input placeholder="Add new URL" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
      <Button onClick={addUrl} mt={2}>Add URL</Button>
      <List spacing={3} mt={4}>
        {urls.map(url => (
          <ListItem key={url.id}>
            {url.url}
            <Button size="sm" colorScheme="red" onClick={() => deleteUrl(url.id)} ml={2}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Urls;