import { Box, Button, Input, List, ListItem, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { client } from "lib/crud";

const Keys = () => {
  const [keys, setKeys] = useState([]);
  const [newKey, setNewKey] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const data = await client.getWithPrefix("key:");
        if (data) {
          setKeys(data.map(item => ({ id: item.key, key: item.value.key })));
        }
      } catch (err) {
        setError("Failed to fetch keys.");
      }
    };
    fetchKeys();
  }, []);

  const addKey = async () => {
    const key = `key:${Date.now()}`;
    try {
      const success = await client.set(key, { key: newKey });
      if (success) {
        setKeys([...keys, { id: key, key: newKey }]);
        setNewKey("");
      }
    } catch (err) {
      setError("Failed to add key.");
    }
  };

  const deleteKey = async (id) => {
    try {
      const success = await client.delete(id);
      if (success) {
        setKeys(keys.filter(keyItem => keyItem.id !== id));
      }
    } catch (err) {
      setError("Failed to delete key.");
    }
  };

  return (
    <Box p={[3, 4, 5]} m={[2, 3, 4]} bg="white" boxShadow="xl" borderRadius="lg">
      <Text fontSize="2xl" mb={4}>Manage Your Keys</Text>
      <Input
        placeholder="Add new Key"
        value={newKey}
        onChange={(e) => setNewKey(e.target.value)}
        mb={4} p={2}
      />
      <Button onClick={addKey} colorScheme="blue" width={['full', 'auto']} m={3} p={2}>Add Key</Button>
      <List spacing={3} mt={4} border="1px" borderColor="gray.200" p={3} bg="gray.50">
        {keys.map(keyItem => (
          <ListItem key={keyItem.id}>
            {keyItem.key} <Button size="sm" colorScheme="red" onClick={() => deleteKey(keyItem.id)}>Delete</Button>
          </ListItem>
        ))}
        {error && <Text color="red.500">{error}</Text>}
      </List>
    </Box>
  );
};

export default Keys;