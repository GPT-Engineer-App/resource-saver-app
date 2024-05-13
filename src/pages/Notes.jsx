import { Box, Button, Text, Textarea, Grid, GridItem, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { client } from "lib/crud";
import { motion } from "framer-motion";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await client.getWithPrefix("note:");
        if (data) {
          setNotes(data.map(item => ({ id: item.key, note: item.value.note })));
        }
      } catch (err) {
        setError("Failed to fetch notes.");
      }
    };
    fetchNotes();
  }, []);

  const addNote = async () => {
    try {
      const key = `note:${Date.now()}`;
      const success = await client.set(key, { note: newNote });
      if (success) {
        setNotes([...notes, { id: key, note: newNote }]);
        setNewNote("");
      }
    } catch (err) {
      setError("Failed to add note.");
    }
  };

  const deleteNote = async (id) => {
    try {
      const success = await client.delete(id);
      if (success) {
        setNotes(notes.filter(note => note.id !== id));
      }
    } catch (err) {
      setError("Failed to delete note.");
    }
  };

  return (
    <Box p={[3, 4, 5]} m={[2, 3, 4]} bg="#f5f5dc" boxShadow="xl" borderRadius="lg" fontFamily="Georgia, serif">
      <Text fontSize="2xl" mb={4} fontFamily="Times New Roman, serif">Manage Your Notes</Text>
      <Textarea
        placeholder="Add new Note"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        mb={2}
        p={2}
        m={2}
        borderRadius="md"
        borderColor="green.200"
      />
      <Button onClick={addNote} colorScheme="green" width={['full', 'auto']} m={2}>Add Note</Button>
      {error && <Text color="red.500">{error}</Text>}
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={4}>
        {notes.map(note => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GridItem bg="white" boxShadow="xl" p={4} borderRadius="lg" border="1px solid #ccc">
              <Image src="https://via.placeholder.com/150" alt="Note Image" mb={4} />
              <Text fontSize="lg">{note.note}</Text>
              <Button colorScheme="red" onClick={() => deleteNote(note.id)}>Delete</Button>
            </GridItem>
          </motion.div>
        ))}
      </Grid>
    </Box>
  );
};

export default Notes;