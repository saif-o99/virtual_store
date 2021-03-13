import React, {useEffect, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import {auth, SignInWithGoogle} from "../../firebase.utils";
import {IconButton} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Alert from "@material-ui/lab/Alert";
import GoogleIcon from "../assets/google.png";

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

function LoginPage({history}) {
    const classes = useStyles();

    const [error, setError] = useState("");

    useEffect(() => {
        auth.getRedirectResult().then(function (result) {
        }).catch(function (error) {
            setError(error.message)
        });
    });

    // Handle Login
    const login = (e) => {
        e.preventDefault()
        const {email, password } = e.target.elements;

            auth.signInWithEmailAndPassword(email.value, password.value)
                .then(() => {
                    // Automatic Redirect to HomeIndex
                    history.push('/')
                })
                .catch((err) => {
                    switch (err.code) {
                        case "auth/user-not-found":
                            return setError("Couldn't find your account.");
                        case "auth/wrong-password":
                            return setError( "That's an incorrect password. Try again.");
                        case "auth/invalid-email":
                            return setError( "Please enter a valid Email Address.");
                        default:
                            return setError("Something went wrong on our side.");
                    }
                });

    };
    const loginWithGoogle = () => {
        history.push("/register?auth=google");
        try {
            SignInWithGoogle().then(() => {
            }).catch(err => {
                let errorMessage = err.message;
                setError(errorMessage);
            });
        } catch (e) {
            let errorMessage = e.message;
            setError(errorMessage);
        }
    };
    return (
        <div className={classes.background}>
            <div style={{height: "64px"}}/>
            <div style={{display: "none"}}>{error}</div>
            <Grid justify={"center"} component={"div"} container>
                <Grid component={"div"} xl={5} lg={5} md={6} sm={6} xs={12} item
                      style={{display: "flex", justifyContent: "center"}}>
                    <div className={classes.card}>
                        <form onSubmit={login}>
                            <div style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "space-between",
                                marginBottom: "16px"
                            }}>
                                <Typography variant={"h5"}>Sign In</Typography>
                                <Typography variant={"body2"}>
                                    <span style={{opacity: "0.6", marginRight: "8px"}}>New User?</span>
                                    <Typography variant={"body2"} component={"span"}><Link to={"/register"}
                                                                                           style={{color: "blue"}}
                                                                                           variant={"secondary"}>Sign
                                        Up</Link></Typography>
                                </Typography>
                            </div>
                            <div style={{height: '15px'}}/>
                            <TextField label="Email Address" variant="outlined" type={"email"} name={"email"}
                                       fullWidth/>
                            <div style={{height: '15px'}}/>
                            <TextField label="Set Password" variant="outlined" type={"password"} name={"password"}
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
                            }}> Sign In </Button>
                        </form>
                        <div style={{display: "flex", margin: "24px 5%", alignItems: "center"}}>
                            <div style={{flex: "1", height: "2px", background: "grey", opacity: "0.1"}}/>
                            <Typography variant={"body2"} component={"span"}
                                        style={{color: "grey", margin: "0 12px"}}>or</Typography>
                            <div style={{flex: "1", height: "2px", background: "grey", opacity: "0.1"}}/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <IconButton background={"white"} onClick={loginWithGoogle}
                                        style={{borderRadius: '30px', background: 'white', fontSize: "14px"}}
                            ><img src={GoogleIcon} width={20} height={20} style={{marginRight: "15px"}}/>Continue
                                with Google</IconButton>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <div style={{height: "64px"}}/>
        </div>
    );
}

export default LoginPage;