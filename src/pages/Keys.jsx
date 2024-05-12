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
    if (newKey) {
      const key = `key:${Date.now()}`;
      const success = await client.set(key, { key: newKey });
      if (success) {
        setKeys([...keys, { id: key, key: newKey }]);
        setNewKey("");
      }
    }
  };

  const deleteKey = async (id) => {
    const success = await client.delete(id);
    if (success) {
      setKeys(keys.filter(key => key.id !== id));
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Manage Keys</Text>
      <Input placeholder="Add new Key" value={newKey} onChange={(e) => setNewKey(e.target.value)} />
      <Button onClick={addKey} mt={2}>Add Key</Button>
      <List spacing={3} mt={4}>
        {keys.map(key => (
          <ListItem key={key.id}>
            {key.key}
            <Button size="sm" colorScheme="red" onClick={() => deleteKey(key.id)} ml={2}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Keys;