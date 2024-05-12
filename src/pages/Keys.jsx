import { Box, Button, Input, List, ListItem, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { client } from "lib/crud";

const Keys = () => {
  const [keys, setKeys] = useState([]);
  const [newKey, setNewKey] = useState("");

  useEffect(() => {
    const fetchKeys = async () => {
      const data = await client.getWithPrefix("key:");
      if (data) {
        setKeys(data.map(item => ({ id: item.key, key: item.value.key })));
      }
    };
    fetchKeys();
  }, []);

  const addKey = async () => {
    const key = `key:${Date.now()}`;
    const success = await client.set(key, { key: newKey });
    if (success) {
      setKeys([...keys, { id: key, key: newKey }]);
      setNewKey("");
    }
  };

  const deleteKey = async (id) => {
    const success = await client.delete(id);
    if (success) {
      setKeys(keys.filter(keyItem => keyItem.id !== id));
    }
  };

  return (
    <Box p={[3, 4, 5]} m={[2, 3, 4]} bg="white" boxShadow="xl" borderRadius="lg">
      <Text fontSize="2xl" mb={4}>Manage Your Keys</Text>
      <Input
        placeholder="Add new Key"
        value={newKey}
        onChange={(e) => setNewKey(e.target.value)}
        mb={2}
      />
      <Button onClick={addKey} colorScheme="blue" width={['full', 'auto']} m={2}>Add Key</Button>
      <List spacing={3} mt={4} border="1px" borderColor="gray.200" p={3}>
        {keys.map(keyItem => (
          <ListItem key={keyItem.id}>
            {keyItem.key} <Button size="sm" colorScheme="red" onClick={() => deleteKey(keyItem.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Keys;