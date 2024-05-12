import { Box, Button, Input, List, ListItem, Text, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { client } from "lib/crud";

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
    <Box p={[3, 4, 5]} m={[2, 3, 4]} bg="white" boxShadow="xl" borderRadius="lg">
      <Text fontSize="2xl" mb={4}>Manage Your Notes</Text>
      <Textarea
        placeholder="Add new Note"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        mb={2}
        p={2}
        m={2}
      />
      <Button onClick={addNote} colorScheme="blue" width={['full', 'auto']} m={2}>Add Note</Button>
      {error && <Text color="red.500">{error}</Text>}
      <List spacing={3} mt={4} border="1px" borderColor="gray.200" p={3} bg="gray.50">
        {notes.map(note => (
          <ListItem key={note.id} p={2} borderBottom="1px" borderColor="gray.300">
            {note.note} <Button size="sm" colorScheme="red" onClick={() => deleteNote(note.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Notes;