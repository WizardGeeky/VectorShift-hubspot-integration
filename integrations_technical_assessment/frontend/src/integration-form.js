"use client";

import { useState } from "react";
import { Autocomplete, TextField, Box, } from "@mui/material";
import { AirtableIntegration } from "./integrations/airtable";
import { NotionIntegration } from "./integrations/notion";
import { HubspotIntegration } from "./integrations/hubspot";
import { DataForm } from "./data-form";

const integrationMapping = {
  Notion: NotionIntegration,
  Airtable: AirtableIntegration,
  Hubspot: HubspotIntegration,
};

export const IntegrationForm = () => {
  const [integrationParams, setIntegrationParams] = useState({});
  const [user, setUser] = useState("TestUser");
  const [org, setOrg] = useState("TestOrg");
  const [currType, setCurrType] = useState(null);
  const CurrIntegration = integrationMapping[currType];

  return (
    <Box display="flex" justifyContent="center" p={2}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          maxWidth: "1100px",
          borderRadius: 3,
          border: "2px solid #6F04AE",
          overflow: "hidden",
          boxShadow: 3,
          backgroundColor: "#f9f2fc",
        }}
      >
        <Box
          flex={1}
          p={3}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "600",
              color: "#6F04AE",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Integration Setup
          </h2>

          <TextField
            fullWidth
            variant="outlined"
            label="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            InputLabelProps={{ style: { color: "#6F04AE" } }}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Organization"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            InputLabelProps={{ style: { color: "#6F04AE" } }}
          />

          <Autocomplete
            id="integration-type"
            options={Object.keys(integrationMapping)}
            sx={{
              "& input": { color: "#6F04AE" },
              "& label": { color: "#6F04AE" },
              "& .MuiOutlinedInput-root": {
                borderColor: "#6F04AE",
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Integration Type"
                variant="outlined"
                InputLabelProps={{ style: { color: "#6F04AE" } }}
              />
            )}
            onChange={(e, value) => setCurrType(value)}
          />
        </Box>

        <Box
          flex={1.2}
          p={3}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          {currType && (
            <Box
              sx={{
                background: "#f2e8fb",
                border: "1px solid #d1b3e0",
                padding: 3,
                borderRadius: 2,
              }}
            >
              <CurrIntegration
                user={user}
                org={org}
                integrationParams={integrationParams}
                setIntegrationParams={setIntegrationParams}
              />
            </Box>
          )}

          {integrationParams?.credentials && (
            <Box
              sx={{
                background: "#f2e8fb",
                border: "1px solid #d1b3e0",
                padding: 3,
                borderRadius: 2,
              }}
            >
              <DataForm
                integrationType={integrationParams?.type}
                credentials={integrationParams?.credentials}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};