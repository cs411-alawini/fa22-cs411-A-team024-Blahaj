import React, { Component } from "react";
import Drawer from './Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import "./mystyles.css";

const axios = require("axios");


class Form extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      vaccine1: "",
      vaccine2: "",
      proof1: "",
      proof2: "",
      docId: "",
      symp: ""
    };

    this.state = this.initialState;
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  //
  // Main function
  //

  cosineSimilarity(vec1, vec2) {
    const dotProduct = vec1
      .map((val, i) => val * vec2[i])
      .reduce((accum, curr) => accum + curr, 0);
    const vec1Size = this.calcVectorSize(vec1);
    const vec2Size = this.calcVectorSize(vec2);

    return dotProduct / (vec1Size * vec2Size);
  }

  //
  // tf-idf algorithm implementation (https://en.wikipedia.org/wiki/Tf%E2%80%93idf)
  //

  calcTfIdfVectorForDoc(doc, otherDocs, allWordsSet) {
    return Array.from(allWordsSet).map((word) => {
      return this.tf(word, doc) * this.idf(word, doc, otherDocs);
    });
  }

  tf(word, doc) {
    const wordOccurences = doc.filter((w) => w === word).length;
    return wordOccurences / doc.length;
  }

  idf(word, doc, otherDocs) {
    const docsContainingWord = [doc].concat(otherDocs).filter((doc) => {
      return !!doc.find((w) => w === word);
    });

    return (1 + otherDocs.length) / docsContainingWord.length;
  }

  //
  // Helper functions
  //

  omitPunctuations(word) {
    return word.replace(/[\!\.\,\?\-\?]/gi, "");
  }

  toLowercase(word) {
    return word.toLowerCase();
  }

  calcVectorSize(vec) {
    return Math.sqrt(vec.reduce((accum, curr) => accum + Math.pow(curr, 2), 0));
  }

  // handleSubmit = (event) => {
  //   const { name, value } = event.target.value;

  //   this.setState({
  //     [name]: value
  //   });
  // };

  onFormSubmit = (event) => {
    event.preventDefault();
    const str1 = "Headaches, nausea, vomiting, diarrhoea";

    //
    // Preprocess strings and combine words to a unique collection
    //

    const str1Words = str1
      .trim()
      .split(" ")
      .map(this.omitPunctuations)
      .map(this.toLowercase);
    const str2Words = this.state.symp
      .trim()
      .split(" ")
      .map(this.omitPunctuations)
      .map(this.toLowercase);
    const allWordsUnique = Array.from(new Set(str1Words.concat(str2Words)));

    //
    // Calculate IF-IDF algorithm vectors
    //

    const str1Vector = this.calcTfIdfVectorForDoc(
      str1Words,
      [str2Words],
      allWordsUnique
    );
    const str2Vector = this.calcTfIdfVectorForDoc(
      str2Words,
      [str1Words],
      allWordsUnique
    );

    //
    // Main
    //
    const val = this.cosineSimilarity(str1Vector, str2Vector);

    console.log(
      "Cosine similarity",
      this.cosineSimilarity(str1Vector, str2Vector)
    );
     //  this.handleSubmit(this.state);
    axios.post('http://localhost:5000/api/users/formVaccine/', {
      userID: localStorage.getItem("uid"),
      vaccine1: this.state.vaccine1,
      vaccine2: this.state.vaccine2,
      proof1: this.state.proof1,
      proof2: this.state.proof2,
      symp: this.state.symp,
      docId: this.state.docId,
      isApproved:0,
      score: val
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState(this.initialState);
  };

  render() {
    const { vaccine1, vaccine2, proof1, proof2, symp, docId } = this.state;

    return (
       <div> 
        <Drawer />
      
        <div style = {{marginLeft: "16vw", marginTop:"20vh"}}>
        <p align = "center" className = "titlepage" style={{fontSize: "4.1vw", color: "#11223E" }}>VACCINATION FORM</p>
        <br />
        <Divider />
        <br />
      <form onSubmit={this.onFormSubmit}>
      <Grid container spacing={2}>
                <Grid item xs={2}>
                <Typography variant='h5' style = {{color:"#F65798"}}>Vaccine 1</Typography>
        </Grid>

        <Grid item xs={4}>
        <TextField
          type="text"
          name="vaccine1"
          id="vaccine1"
          
        
          value={vaccine1}
          onChange={this.handleChange}
        /><br /><br />
        </Grid>
        </Grid>

        <Grid container spacing={2}>
                <Grid item xs={2}>
                <Typography variant='h5' style = {{color:"#F65798"}}>Vaccine 2</Typography>
        </Grid>
        <Grid item xs={4}>
        
        <TextField
          type="text"
          name="vaccine2"
          id="vaccine2"
          value={vaccine2}
          onChange={this.handleChange}
        />
        </Grid>
        </Grid>
        <br /><br />
        <Grid container spacing={2}>
                <Grid item xs={2}>
                <Typography variant='h5' style = {{color:"#F65798"}}>Vaccine 1 Proof Link</Typography>
        </Grid>
        <Grid item xs={4}>
        <TextField
          type="text"
          name="proof1"
          id="proof1"
          value={proof1}
          onChange={this.handleChange}
        />
        </Grid>
        </Grid><br /><br />
        <Grid container spacing={2}>
                <Grid item xs={2}>
                <Typography variant='h5' style = {{color:"#F65798"}}>Vaccine 2 Proof Link</Typography>
        </Grid>
        <Grid item xs={4}>
        <TextField
          type="text"
          name="proof2"
          id="proof2"
          value={proof2}
          onChange={this.handleChange}
        />
        </Grid></Grid>
        <br /><br />
        <Grid container spacing={2}>
                <Grid item xs={2}>
                <Typography variant='h5' style = {{color:"#F65798"}}>Recent Symptoms</Typography>
        </Grid>
        <Grid item xs={4}>
        <TextField
          type="text"
          name="symp"
          id="symp"
          value={symp}
          onChange={this.handleChange}
        />
        </Grid></Grid>
        <br /><br />
        <Grid container spacing={2}>
                <Grid item xs={2}>
                <Typography variant='h5' style = {{color:"#F65798"}}>Approval Doctor ID</Typography>
        </Grid>
        <Grid item xs={4}>
       
        <TextField
          type="text"
          name="docId"
          id="docId"
          value={docId}
          onChange={this.handleChange}
        /></Grid></Grid>
<br /><br />
        
        <Button type = "submit" size="large"  variant="contained" style = {{backgroundColor:"#F65798", color:"white"}} >
                SUBMIT
            </Button>
      </form>
      </div>
      </div>
    );
  }
}

export default Form;