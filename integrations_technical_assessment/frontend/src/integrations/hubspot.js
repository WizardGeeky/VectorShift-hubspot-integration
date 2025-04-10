import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress } from "@mui/material";

export const HubspotIntegration = ({ user, org, integrationParams, setIntegrationParams }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnectClick = async () => {
        try {
            setIsConnecting(true);
            const formData = new FormData();
            formData.append('user_id', user);
            formData.append('org_id', org);
            const response = await axios.post(`http://localhost:8000/integrations/hubspot/authorize`, formData);
            const authURL = response?.data;

            const newWindow = window.open(authURL, 'Hubspot Authorization', 'width=600, height=600');
            const pollTimer = window.setInterval(() => {
                if (newWindow?.closed !== false) {
                    window.clearInterval(pollTimer);
                    handleWindowClosed();
                }
            }, 200);
        } catch (e) {
            setIsConnecting(false);
            alert(e?.response?.data?.detail);
        }
    };

    const handleWindowClosed = async () => {
        try {
            const formData = new FormData();
            formData.append('user_id', user);
            formData.append('org_id', org);
            const response = await axios.post(`http://localhost:8000/integrations/hubspot/credentials`, formData);
            const credentials = response.data;
            if (credentials) {
                setIsConnecting(false);
                setIsConnected(true);
                setIntegrationParams(prev => ({ ...prev, credentials: credentials, type: 'Hubspot' }));
            }
            setIsConnecting(false);
        } catch (e) {
            setIsConnecting(false);
            alert(e?.response?.data?.detail);
        }
    };

    useEffect(() => {
        setIsConnected(integrationParams?.credentials ? true : false);
    }, []);

    return (
        <Box mt={2} display="flex" justifyContent="center">
            <Button
                variant="contained"
                onClick={isConnected ? () => {} : handleConnectClick}
                disabled={isConnecting}
                sx={{
                    backgroundColor: isConnected ? '#6F04AE' : '#9B59B6',
                    '&:hover': {
                        backgroundColor: '#6F04AE',
                    },
                    pointerEvents: isConnected ? 'none' : 'auto',
                    cursor: isConnected ? 'default' : 'pointer',
                    opacity: isConnected ? 1 : undefined,
                }}
            >
                {isConnected ? 'Hubspot Connected' : isConnecting ? <CircularProgress size={20} color="inherit" /> : 'Connect to Hubspot'}
            </Button>
        </Box>
    );
};