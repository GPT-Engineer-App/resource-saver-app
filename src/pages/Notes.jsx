import { Box, Button, Input, List, ListItem, Text, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { client } from "lib/crud";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await client.getWithPrefix("note:");
      if (data) {
        setNotes(data.map(item => ({ id: item.key, note: item.value.note })));
      }
    };
    fetchNotes();
  }, []);

  const addNote = async () => {
    const key = `note:${Date.now()}`;
    const success = await client.set(key, { note: newNote });
    if (success) {
      setNotes([...notes, { id: key, note: newNote }]);
      setNewNote("");
    }
  };

  const deleteNote = async (id) => {
    const success = await client.delete(id);
    if (success) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Manage Your Notes</Text>
      <Textarea
        placeholder="Add new Note"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        mb={2}
      />
      <Button onClick={addNote} colorScheme="blue">Add Note</Button>
      <List spacing={3} mt={4}>
        {notes.map(note => (
          <ListItem key={note.id}>
            {note.note} <Button size="sm" colorScheme="red" onClick={() => deleteNote(note.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Notes;