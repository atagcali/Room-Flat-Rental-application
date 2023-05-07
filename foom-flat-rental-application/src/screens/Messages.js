import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Divider,
    List,
    Grid,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import UpperBar from '../profile/UpperBar';


const Messages = () => {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [messageText, setMessageText] = useState("");

    const persons = [
        { id: 1, name: "Person 1" },
        { id: 2, name: "Person 2" },
        { id: 3, name: "Person 3" },
    ];

    const me = { id: 0, name: "Me" };

    const [messages, setMessages] = useState([
        { id: 1, sender: 1, receiver: me.id, text: "Hello!" },
        { id: 2, sender: me.id, receiver: 1, text: "Hi there!" },
    ]);

    const handlePersonClick = (id) => {
        setSelectedPerson(id);
    };

    const handleSendClick = () => {
        if (messageText.trim()) {
            const newMessage = {
                id: messages.length + 1,
                sender: me.id,
                receiver: selectedPerson,
                text: messageText,
            };
            setMessages([...messages, newMessage]);
            setMessageText("");
        }
    };

    return (
        <Grid style={{width: '100%'}}>
            <UpperBar style={{ width: '100%' }}></UpperBar>
            <Divider orientation="horizontal" flexItem style={{ marginTop: '5px' }} />

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Box display="flex" width="100%" maxWidth="900px">
                    <List>
                        {persons.map((person, index) => (
                            <React.Fragment key={person.id}>
                                <ListItem
                                    button
                                    onClick={() => handlePersonClick(person.id)}
                                >
                                    <ListItemText primary={person.name} />
                                </ListItem>
                                {index !== persons.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                    <Divider orientation="vertical" flexItem />
                    <Box flexGrow={1} paddingLeft={2}>
                        {selectedPerson !== null && (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    Messages with{" "}
                                    {persons.find((person) => person.id === selectedPerson).name}
                                </Typography>
                                <List>
                                    {messages
                                        .filter((message) => message.sender === selectedPerson || message.receiver === selectedPerson)
                                        .map((message) => (
                                            <ListItem key={message.id}>
                                                <Paper
                                                    elevation={3}
                                                    sx={{
                                                        padding: 2,
                                                        backgroundColor:
                                                            message.sender === me.id ? "primary.main" : "secondary.main",
                                                        color: "white",
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={`Sended by: ${message.sender === me.id ? me.name : persons.find((person) => person.id === message.sender).name
                                                            }`}
                                                        secondary={message.text}
                                                        secondaryTypographyProps={{
                                                            variant: "body1",
                                                            color: "white",
                                                        }}
                                                    />
                                                </Paper>
                                            </ListItem>
                                        ))}
                                </List>
                                <Box display="flex" alignItems="center" marginTop={2}>
                                    <TextField
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        label="Type your message"
                                    />
                                    <Box marginLeft={1}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSendClick}
                                        >
                                            Send
                                        </Button>
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default Messages;
