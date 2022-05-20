/*
Author:         Fausto Correa
Company:        Prolucid
Funtionality:   The assignment is to arrange the sentences within the story in alphabetical order.
Date:           May 20, 2022
*/

import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import {
  Box,
  ListItemButton,
  ListItemText,
  ListItem,
  List,
  Divider,
  Grid,
  Button,
  Paper,
  Typography,
  Stack,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

class OrderText extends Component {
  state = {
    value: "",
    ordered: [],
  };
  // This method handlerOrder is thrown when the user click to order sentences, first split the sentences and after order them
  handleOrder = () => {
    let firstClean = this.state.value.replace(/"/g, "");
    firstClean = firstClean.replace(
      /------------------------------------------------/g,
      ""
    );
    this.setState({
      ordered: firstClean
        .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
        //.replace(/([.?!])\x20{1,2}(?=[A-Z\d])/g, "$1|")
        .split("|")
        .sort(),
    });
    console.log(this.state.ordered);
  };

  render() {
    return (
      <Box sx={{ width: "100%", maxWidth: 800 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Stack spacing={2}>
                <Typography variant="h4" component="div" gutterBottom>
                  Order Sentences Alphabetically
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Copy your text and paste in the following textarea. Once done,
                  click in the button "Order Sentences"
                </Typography>
                <TextareaAutosize
                  value={this.state.value}
                  onChange={(e) => {
                    this.setState({ value: e.target.value }); // This statement collect the data from user throught a textarea
                  }}
                  maxRows={1000}
                  aria-label="maximum height"
                  placeholder="Paste your text here"
                  defaultValue=""
                  style={{ width: 500, height: 200 }}
                />
                <Button variant="contained" onClick={this.handleOrder}>
                  Order Sentences
                </Button>
              </Stack>
            </Item>
          </Grid>
          <Grid item xs>
            <Item>
              <Typography variant="body2" gutterBottom>
                <List>
                  {this.state.ordered.map((item) => (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary={item} />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </>
                  ))}
                </List>
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default OrderText;
