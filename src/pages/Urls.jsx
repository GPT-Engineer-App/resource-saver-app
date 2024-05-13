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
        } else {
          setUrls([]);
        }
      } catch (err) {
        setError("Không thể lấy URL");
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
      setError("Không thể thêm URL");
    }
  };

  const deleteUrl = async (id) => {
    try {
      const success = await client.delete(id);
      if (success) {
        setUrls(urls.filter(url => url.id !== id));
      }
    } catch (err) {
      setError("Không thể xóa URL");
    }
  };

  return (
    <Box p={[3, 4, 5]} m={[2, 3, 4]} bg="gray.100" boxShadow="xl" borderRadius="lg">
      <Text fontSize="2xl" mb={4} fontFamily="Arial, sans-serif">Quản lý URL của bạn</Text>
      <Input
        placeholder="Thêm URL mới"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        mb={4} p={4} size="lg"
        bg="white"
        borderColor="gray.500"
        _hover={{ borderColor: "gray.700" }}
        _focus={{ borderColor: "blue.300" }}
      />
      <Button onClick={addUrl} colorScheme="teal" width={['full', 'auto']} m={3} p={3} _hover={{ bg: "teal.600" }} _active={{ bg: "teal.800" }}>Thêm URL</Button>
      {urls.length === 0 && <Text color="gray.500">Không có URL nào để hiển thị.</Text>}
      {error && <Text color="red.500">{error}</Text>}
      <Grid templateColumns="repeat(3, 1fr)" gap={8} mt={4}>
        {urls.map(url => (
          <GridItem key={url.id} bg="white" boxShadow="2xl" p={5} borderRadius="lg">
            <Image src="https://via.placeholder.com/150" alt="URL Image" mb={4} />
            <Text fontSize="lg">{url.url}</Text>
            <Button colorScheme="red" onClick={() => deleteUrl(url.id)} _hover={{ bg: "red.600" }}>Xóa</Button>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Urls;