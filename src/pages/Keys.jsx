import { Box, Button, Input, Text, Grid, GridItem, Image } from "@chakra-ui/react";
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
        } else {
          setKeys([]);
        }
      } catch (err) {
        setError("Không thể lấy khóa");
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
      setError("Không thể thêm khóa");
    }
  };

  const deleteKey = async (id) => {
    try {
      const success = await client.delete(id);
      if (success) {
        setKeys(keys.filter(keyItem => keyItem.id !== id));
      }
    } catch (err) {
      setError("Không thể xóa khóa");
    }
  };

  return (
    <Box p={[3, 4, 5]} m={[2, 3, 4]} bg="gray.800" color="white" fontFamily="Arial, sans-serif" boxShadow="xl" borderRadius="lg">
      <Text fontSize="2xl" mb={4}>Quản lý khóa của bạn</Text>
      <Input
        placeholder="Thêm khóa mới"
        value={newKey}
        onChange={(e) => setNewKey(e.target.value)}
        mb={4} p={2}
        bg="gray.700" borderColor="gray.500" _hover={{ borderColor: "white" }} _focus={{ borderColor: "blue.300" }}
      />
    <Button onClick={addKey} colorScheme="red" width={['full', 'auto']} m={3} p={2} _hover={{ bg: "red.600" }} _active={{ bg: "red.800" }}>Thêm khóa</Button>
    {keys.length === 0 && <Text color="gray.500">Không có khóa nào để hiển thị</Text>}
      <Grid templateColumns="repeat(1, 1fr)" gap={2} mt={4} border="1px" borderColor="gray.600">
        {keys.map(keyItem => (
          <GridItem key={keyItem.id} bg="white" boxShadow="xl" p={4} borderRadius="lg">
            <Image src="https://via.placeholder.com/150" alt="Key Image" mb={4} />
            <Text fontSize="lg">{keyItem.key}</Text>
            <Button colorScheme="red" onClick={() => deleteKey(keyItem.id)} _hover={{ bg: "red.600" }} _active={{ bg: "red.800" }}>Xóa</Button>
          </GridItem>
        ))}
      </Grid>
      {error && <Text color="red.500">{error}</Text>}
    </Box>
  );
};

export default Keys;