import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import {firestore} from '../../firebase.utils';
import { SendMessage } from 'react-unity-webgl';

const useStyles = makeStyles((theme) => ({
  background: {
    display: "flex",
    justifyContent: "center",
    background: '#f7f8fb',
    alignItems: "center",
    width: "100%",
    height: "100vh",
    flexDirection: "column",
    [theme.breakpoints.down('xs')]: {
      justifyContent: "flex-start",
    },
  },
  card: {
    width: "100%",
    position: "relative",
    maxWidth: "480px",
    borderRadius: "8px",
    flexDirection: "column",
    display: "flex",
    overflow: "hidden",
    boxSizing: "border-box",
    background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.5), rgba(255,255,255,0.0) 60%)",
    boxShadow: `16px 24px 32px 8px rgba(200,200,200,0.02)`,
    padding: "48px 56px",
  }
}));

const AddItem = () => {
  const classes = useStyles();
  const [error, setError] = useState("");

  const add=(e)=>{
    e.preventDefault();
    setError("");
    const {name, description,price } = e.target.elements;
    console.log(name)
    if(name.value==='' ||description.value===''||price.value===''){
      setError("Please fill all the fields");
      return;
    }else{
      firestore.collection('products').add({
        name: name.value,
        description: description.value,
        price: price.value
      }).then(r  =>{
        console.log('success')
        SendMessage ('Canvas', 'addItem', name.value);
      })
    }
  }

  return (
      <div className={classes.background}>
        <div style={{height: "64px"}}/>
        <Grid justify={"center"} component={"div"} container>
          <Grid component={"div"} xl={5} lg={5} md={6} sm={6} xs={12} item
                style={{display: "flex", justifyContent: "center"}}>
            <div className={classes.card}>
              <form onSubmit={add}>
                <div style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  marginBottom: "16px"
                }}>
                  <Typography variant={"h5"}>Add Item</Typography>
                </div>
                <div style={{height: '15px'}}/>
                <TextField label="Product Name" variant="outlined" type={"text"} name={"name"}
                           fullWidth/>
                <div style={{height: '15px'}}/>
                <TextField label="Price" variant="outlined" type={"text"} name={"price"}
                           fullWidth/>
                <div style={{height: '15px'}}/>
                <TextField label="Description" variant="outlined" type={"text"} name={"description"}
                           fullWidth/>
                <div style={{height: '10px'}}/>
                {error !== "" &&
                <Alert severity="error">{error}</Alert>
                }
                <div style={{height: '10px'}}/>
                <Button type={"submit"} style={{
                  marginTop: "24px",
                  background: "black",
                  color: 'white',
                  padding: "12px 50px"
                }}> Submit </Button>
              </form>
            </div>
          </Grid>
        </Grid>
        <div style={{height: "64px"}}/>
      </div>
  );
};

export default AddItem;